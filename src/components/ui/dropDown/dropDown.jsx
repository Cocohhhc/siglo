'use client';
import { useState, useRef, useEffect } from "react";
import { HiChevronDown, HiXMark, HiBuildingOffice2, HiCheck } from "react-icons/hi2";
import Button from "@/src/components/ui/button/button";

export default function DropDowm({
    setUserDepartament,
    options = [],
    defaultLabel = "Departamento"
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const dropdownRef = useRef(null);

    // Cerrar al hacer click fuera
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleSelect(opt) {
        setSelected(opt);
        setUserDepartament(opt ? opt.id : '');
        setIsOpen(false);
    }

    function handleClear(e) {
        e.stopPropagation();
        setSelected(null);
        setUserDepartament('');
        setIsOpen(false);
    }

    const displayLabel = selected ? selected.name : defaultLabel;

    return (
        <div ref={dropdownRef} className="relative w-full">
            {/* Trigger Button using the actual Button component */}
            <div className="w-full">
                <Button
                    type="button"
                    variant={isOpen ? "primary" : "secundary"} // Using secondary as default for trigger if not open
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 text-sm overflow-hidden
                        ${isOpen 
                            ? 'border-(--color-500) bg-(--color-50) text-(--color-900)' 
                            : 'border-(--color-200) bg-white text-(--text-primary)'}
                        hover:border-(--color-300) hover:bg-(--color-50)
                    `}
                >
                    <div className="flex items-center gap-2.5 min-w-0">
                        <HiBuildingOffice2 className="w-4 h-4 text-(--color-400) shrink-0" />
                        <span className="truncate font-medium">
                            {displayLabel}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        {selected && (
                            <span
                                onClick={handleClear}
                                className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-(--color-200) hover:bg-(--color-300) transition-colors cursor-pointer"
                            >
                                <HiXMark className="w-2.5 h-2.5 text-(--color-700) stroke-[3]" />
                            </span>
                        )}
                        <HiChevronDown 
                            className={`w-4 h-4 text-(--color-400) transition-transform duration-250 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                        />
                    </div>
                </Button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border-2 border-(--color-200) rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* "Todos" option */}
                    <DropdownItem
                        label={defaultLabel}
                        isSelected={!selected}
                        onClick={() => handleSelect(null)}
                        isDefault
                    />

                    {/* Divider */}
                    <div className="h-px bg-(--color-100) mx-3" />

                    {/* Options */}
                    <div className="max-h-[220px] overflow-y-auto py-1">
                        {options.map(opt => (
                            <DropdownItem
                                key={opt.id}
                                label={opt.name}
                                isSelected={selected?.id === opt.id}
                                onClick={() => handleSelect(opt)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function DropdownItem({ label, isSelected, onClick, isDefault = false }) {
    return (
        <div
            onClick={onClick}
            className={`
                flex items-center gap-2.5 px-4 py-2.5 cursor-pointer transition-all duration-150 text-sm
                ${isSelected ? 'bg-(--color-50) font-semibold text-(--color-700)' : 'bg-transparent font-normal text-(--color-900)'}
                ${isDefault && !isSelected ? 'text-(--text-primary)' : ''}
                hover:bg-(--color-50)
            `}
        >
            {/* Selection indicator */}
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isSelected ? 'bg-(--color-500)' : 'bg-transparent'}`} />
            
            <span className="flex-1 truncate">
                {label}
            </span>

            {/* Checkmark */}
            {isSelected && (
                <HiCheck className="w-3.5 h-3.5 text-(--color-500) stroke-[2.5]" />
            )}
        </div>
    );
}
