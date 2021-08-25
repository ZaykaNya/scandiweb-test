export default function compareAttributesById (arr1, arr2) {

    if(arr1.length > 0 && arr2.length > 0) {
        return arr1.every((val, idx) => val.id === arr2[idx].id)
    } else {
        return arr1.length === arr2.length;
    }

}