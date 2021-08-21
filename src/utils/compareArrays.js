export default function compareArrays (arr1, arr2) {

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].id !== arr2[i].id) {
            return false;
        }
    }

    return true;

}