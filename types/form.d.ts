export interface FormType {
    testName?: string;
    index: 1 | 2;
    zipCode?: string;
    interest?: Array<'Independence' | 'Safety' | 'Therapy' | 'Other'>;
    propertyType?: 'Owned' | 'Rental' | 'Mobile';
    name?: string;
    email?: string;
    phone?: string;
    errorMessage?: string;
}