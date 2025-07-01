import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IAddressMaster } from '../interface/IAddressMaster';
import { DataType } from '../interface/IMultiSPQuery';
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.types';
import { IComboBoxOption } from 'office-ui-fabric-react';

export default class Helper {
    public static getAddressByTpe(addressColl: IAddressMaster[], addressType: string): string {
        const addColl: IAddressMaster[] = addressColl.filter(add => add.AddressType === addressType);
        let address: string = '';

        for (let index: number = 0; index < addColl.length; index++) {
            const element: IAddressMaster = addColl[index];
            address += element.Address + '<br/>';
        }
        return address;
    }

    public static mergeArrays(arr1: any[], arr2: any[]): any[] {
        const mergedObject = [...arr1, ...arr2].reduce((acc, curr) => {
            acc[curr.Id] = { ...(acc[curr.Id] || {}), ...curr };
            return acc;
        }, {});
        return Object.values(mergedObject);
    }

    public static mergeArraysById(arr1: any[], arr2: any[]): any[] {
        const mergedMap = new Map();

        // First, add all items from the first array to the map.
        arr1.forEach(item => {
            mergedMap.set(item.Id, { ...item });
        });

        // Then merge items from the second array.
        arr2.forEach(item => {
            // If an object with the same Id exists, merge the properties.
            if (mergedMap.has(item.Id)) {
                mergedMap.set(item.Id, {
                    ...mergedMap.get(item.Id),
                    ...item
                });
            } else {
                // If not, simply add the new object.
                mergedMap.set(item.Id, { ...item });
            }
        });

        // Convert the map back into an array of objects.
        return Array.from(mergedMap.values());
    }

    public static hideShowLoader(strDisplay: string): void {
        if (strDisplay === 'block') {
            if (document.getElementById('divLoading')) {
                document.getElementById('divLoading')!.style.display = 'block !important';
                document.getElementById('divLoading')!.style.visibility = 'visible';
            }
        } else {
            if (document.getElementById('divLoading')) {
                document.getElementById('divLoading')!.style.display = 'none !important';
                document.getElementById('divLoading')!.style.visibility = 'hidden';
            }
        }
    }

    public static getDropDownOptions(dataType: DataType, choices: [], strPlaceholder: string, strTextTitle?: string, ismultiChoice?: boolean): IDropdownOption[] | IComboBoxOption[] {
        let ddOptions: IDropdownOption[] | IComboBoxOption[] = [];
        ddOptions.push({ index: 0, key: '', text: strPlaceholder });

        for (let i = 0; i < choices.length; i++) {
            if (dataType === DataType.ListItems) {
                ddOptions.push({ index: (i + 1), key: choices[i]['Id'], text: choices[i][strTextTitle], ariaLabel: choices[i][strTextTitle] });
            } else if (dataType === DataType.Choices && !ismultiChoice) {
                ddOptions.push({ index: (i + 1), key: choices[i], text: choices[i], ariaLabel: choices[i] });
            } else if (dataType === DataType.Choices && ismultiChoice) {
                // ddOptions.push({ index: (i + 1), key: choices[i] + ';#', text: choices[i], ariaLabel: choices[i] });
                ddOptions.push({ index: (i + 1), key: choices[i], text: choices[i], ariaLabel: choices[i] });
            }
        }

        return ddOptions;
    }

    public static setMultiDropDownOptions(optionColl: [], option: IDropdownOption | IComboBoxOption): [] {
        let optionIndex = optionColl.indexOf(option.key as never, 0);
        if (optionIndex > -1) {
            optionColl.splice(optionIndex, 1);
        } else {
            optionColl.push(option.key as never);
        }
        return optionColl;
    }

    public static filterData(jsonData: any, filterValue: string, includeColumns: Array<string>) {
        const lowercasedValue = filterValue.toLowerCase().trim();
        if (lowercasedValue === "") return jsonData;
        else {
            const filteredData = jsonData.filter(item => {
                return Object.keys(item).some(key =>
                    includeColumns.includes(key) ? item[key] != undefined && item[key] != null ? item[key].toString().toLowerCase().includes(lowercasedValue) : false : false
                );
            });
            return filteredData;
        }
    }

    /**
 * Recursively checks if an object (or any of its nested props)
 * contains the search term.
 */
    public static hasMatch(obj, term) {
        const needle = term.toLowerCase();

        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            // skip metadata if you like:
            if (/^odata|@odata/.test(key)) continue;

            const val = obj[key];
            if (val == null) continue;

            if (typeof val === 'object') {
                if (this.hasMatch(val, term)) return true;
            }
            else {
                if (String(val).toLowerCase().includes(needle)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Returns a new array containing only those items
     * that have ≥1 match in any nested field.
     */
    public static filterDeeply(list, term) {
        if (!term) return list.slice();  // return a shallow copy if no filter
        return list.filter(item => this.hasMatch(item, term));
    }

    public static pickRequiredProperty<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
        return keys.reduce((result, key) => {
            if (obj[key]) {
                result[key] = obj[key];
            } else {
                result[key] = null;
            }
            return result;
        }, {} as Pick<T, K>);
    }
}