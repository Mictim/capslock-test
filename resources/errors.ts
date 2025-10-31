import { ERROR_CODES } from "../const/error-codes";
import { FormType } from "../types/form";

export const testData: {
    zip: FormType[];
    propertyTypeRequired: FormType;
    user: FormType[];
    wrongPhoneNumber: FormType;
} = {
    zip: [
        {
            index: 1,
            zipCode: '',
            errorMessage: ERROR_CODES.ENTER_ZIP_CODE,
            testName: 'Empty ZIP code'
        },
        {
            index: 1,
            zipCode: '124',
            errorMessage: ERROR_CODES.WRONG_ZIP_CODE,
            testName: 'Wrong ZIP code format with less numbers'
        },
        {
            index: 1,
            zipCode: '12AB4',
            errorMessage: ERROR_CODES.WRONG_ZIP_CODE,
            testName: 'Wrong ZIP code format with invalid characters'
        },
        {
            index: 1,
            zipCode: '123456',
            errorMessage: ERROR_CODES.WRONG_ZIP_CODE,
            testName: 'Wrong ZIP code format with more numbers'
        }
    ],
    user: [
        {
            index: 2,
            zipCode: '53134',
            interest: [],
            propertyType: 'Owned',
            name: 'ab',
            email: 'a@a',
            errorMessage: ERROR_CODES.TOO_SHORT_NAME,
            testName: 'User name too short'
        },
        {
            index: 2,
            zipCode: '53134',
            interest: [],
            propertyType: 'Owned',
            name: 'John',
            email: 'a@a',
            errorMessage: ERROR_CODES.FULL_NAME_REQUIRED,
            testName: 'Full name is required'
        },
        {
            index: 2,
            zipCode: '53134',
            interest: [],
            propertyType: 'Owned',
            name: 'J0hn D03!',
            email: 'a@a',
            errorMessage: ERROR_CODES.FULL_NAME_INVALID_CHARACTERS,
            testName: 'Full name has invalid characters'
        },
    ],
    propertyTypeRequired: {
        index: 2,
        zipCode: '53134',
        interest: [],
        propertyType: undefined,
        errorMessage: ERROR_CODES.PROPERTY_TYPE_REQUIRED
    },
    wrongPhoneNumber: {
        index: 2,
        zipCode: '53134',
        interest: [],
        propertyType: 'Owned',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '12345678',
        errorMessage: ERROR_CODES.WRONG_PHONE_NUMBER
    }
};