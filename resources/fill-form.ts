import { FormType } from "../types/form";

export const testData: FormType[] = [
    {
        index: 1,
        zipCode: '13481',
        interest: ['Independence', 'Safety'],
        propertyType: 'Owned',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '2345678901'
    },
    {
        index: 2,
        zipCode: '65123',
        interest: ['Therapy', 'Other'],
        propertyType: 'Rental',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '3456789012'
    },
    {
        index: 1,
        zipCode: '78234',
        interest: [],
        propertyType: 'Mobile',
        name: "Alice O'Connell",
        email: "alice.oconnell@example.com",
        phone: "4567890123"
    },
    {
        index: 2,
        zipCode: '90210',
        interest: ['Safety', 'Independence', 'Therapy', 'Other'],
        propertyType: 'Owned',
        name: "William-Jackson Johnson-Lee-Doppelganger",
        email: 'William-Jackson.Johnson-Lee-Doppelganger@example.com',
        phone: '5678901234'
    }
]