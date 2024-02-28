interface AnyObject {
    [key: string]: any;
}

/**
 * 数组去重（根据某一字段）
 * 举例：[{ id: 1, name: 'John' }, { id: 2, name: 'Mike' }, { id: 1, name: 'John' }, { id: 3, name: 'Alice' }]
 * @export
 * @template T
 * @param {T[]} arr
 * @param {keyof T} field
 * @return {*}  {T[]}
 */
export function deduplicateArrayObject<T extends AnyObject>(arr: T[], field: keyof T): T[] {
    const deduplicatedArr: T[] = [];
    const uniqueValues: Set<any> = new Set();
    for (const obj of arr) {
        const value = obj[field];

        if (!uniqueValues.has(value)) {
            deduplicatedArr.push(obj);
            uniqueValues.add(value);
        }
    }
    return deduplicatedArr;
}



/**
 * 数组分组
 * 如： [ { id: 1, name: 'John', age: 30 },  { id: 2, name: 'Mike', age: 25 },  { id: 3, name: 'Alice', age: 30 }, { id: 4, name: 'Bob', age: 25 },]
 * 返回： { "30": [ { "id": 1, "name": "John", "age": 30 }, { "id": 3, "name": "Alice", "age": 30 }], "25": [ { "id": 2, "name": "Mike", "age": 25 }, { "id": 4, "name": "Bob", "age": 25 }]}
 * @template T
 * @param {T[]} arr
 * @param {keyof T} field
 * @return {*}  {{ [key: string]: T[] }}
 */
export function groupBy<T extends AnyObject>(arr: T[], field: keyof T): { [key: string]: T[] } {
    const grouped: { [key: string]: T[] } = {};

    for (const obj of arr) {
        const value = obj[field];

        if (!grouped[value]) {
            grouped[value] = [];
        }

        grouped[value].push(obj);
    }

    return grouped;
}

/**
 * 根据某一字段排序
 *
 * @template T
 * @param {T[]} arr
 * @param {keyof T} field
 * @return {*}  {T[]}
 */
export function sortByField<T extends AnyObject>(arr: T[], field: keyof T): T[] {
    return arr.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
