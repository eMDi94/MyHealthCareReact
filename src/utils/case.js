import _ from 'lodash';


export function objectKeysFromSnakeCaseToCamelCase(obj) {
    return _.mapKeys(obj, _.rearg(_.camelCase, 1));
}


export function objectKeysFromCamelCaseToSnakeCase(obj) {
    return _.mapKeys(obj, _.rearg(_.snakeCase, 1));
}
