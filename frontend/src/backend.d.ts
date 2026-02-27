import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Medicine {
    id: MedicineId;
    name: string;
    description: string;
    available: boolean;
    category: string;
    price: bigint;
}
export type SectionName = string;
export type MedicineId = bigint;
export interface backendInterface {
    addMedicine(name: string, description: string, price: bigint, category: string): Promise<MedicineId>;
    deleteMedicine(id: MedicineId): Promise<void>;
    editMedicine(id: MedicineId, name: string, description: string, price: bigint, category: string, available: boolean): Promise<void>;
    getAllContent(): Promise<Array<[SectionName, string]>>;
    getAvailableMedicines(): Promise<Array<Medicine>>;
    getContent(section: SectionName): Promise<string>;
    getMedicalProduct(id: MedicineId): Promise<Medicine>;
    getMedicinesByCategory(category: string): Promise<Array<Medicine>>;
    getMedicinesSortedByPrice(): Promise<Array<Medicine>>;
    listMedicines(): Promise<Array<Medicine>>;
    searchMedicines(search: string): Promise<Array<Medicine>>;
    updateContent(section: SectionName, content: string): Promise<void>;
}
