export class ValidarCedulaService {
  validarCedulaRD(cedula: string): boolean {
    const clean = cedula.replace(/-/g, '');

    if (!/^\d{11}$/.test(clean)) return false;

    const pesos = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < 10; i++) {
      let producto = Number(clean[i]) * pesos[i];
      if (producto >= 10)
        producto = Math.floor(producto / 10) + (producto % 10);
      suma += producto;
    }

    const digitoVerificador = (10 - (suma % 10)) % 10;
    return digitoVerificador === Number(clean[10]);
  }
}
