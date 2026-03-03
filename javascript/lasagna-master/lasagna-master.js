/// <reference path="./global.d.ts" />
// @ts-check


/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 * 
 * export function yourFunction(...) {
 *   ...
 * }
 * @param {number | undefined} remainingTime
 */
export function cookingStatus(remainingTime){
    if (remainingTime === 0) return 'Lasagna is done.';
    if (remainingTime === undefined) return 'You forgot to set the timer.';
    return 'Not done, please wait.';
}
/**
 * @param {string | any[]} layers
 */
export function preparationTime (layers, averageTimePerLayer = 2) {
    return layers.length * averageTimePerLayer;
}
/**
 * @param {any} layers
 */
export function quantities(layers){
    let noodles = 0;
    let sauce = 0;
    for (const layer of layers){
        if (layer === 'noodles') {
            noodles += 50;
        }
        else if (layer === 'sauce'){
            sauce += 0.2;
        }
    }
    return {noodles, sauce};
}
/**
 * @param {string | any[]} friendsList
 * @param {any[]} myList
 */
export function addSecretIngredient(friendsList, myList){
    myList.push(friendsList.at(-1));
}
/**
 * @param {{ [x: string]: number; }} recipe
 * @param {number} portions
 */
export function scaleRecipe(recipe, portions){
    const scaled = {};
    const factor = portions / 2;
    for (const ingredient in recipe){
        // @ts-ignore
        scaled[ingredient] = recipe[ingredient] * factor;
    }
    return scaled;
}
