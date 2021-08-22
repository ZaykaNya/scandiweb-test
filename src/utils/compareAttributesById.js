export default function compareAttributesById (arr1, arr2) {

    return arr1.every((val, idx) => val.id === arr2[idx].id)

}