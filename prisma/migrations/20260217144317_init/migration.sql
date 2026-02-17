-- AddForeignKey
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_emisor_id_fkey" FOREIGN KEY ("emisor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_receptor_id_fkey" FOREIGN KEY ("receptor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
