export interface ProductEditDto {
    name?: string;
    price?: number;
    description?: string;
    catalogId?: string; // ใช้ ID ของหมวดหมู่ในการอัปเดต
}
