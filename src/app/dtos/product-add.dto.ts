export interface ProductAddDto {
    name: string;
    price: number;
    description?: string;
    catalogId: string; // ใช้ ID ของหมวดหมู่ในการเชื่อมโยง
}
