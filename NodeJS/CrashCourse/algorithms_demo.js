class ArrayReverse {
  
    // function swaps the array's first element with last
    // element, second element with last second element and
    // so on
    reverse(a) {
        let n = a.length;
        let i, k, t;

        for (i = 0; i < n / 2; i++) {
            t = a[i];
            a[i] = a[n - i - 1];
            a[n - i - 1] = t;
        }
  
        // printing the reversed array
        console.log("Reversed array is: \n");
        for (k = 0; k < n; k++) {
            console.log(a[k]);
        }
    }
}

const arrayReverse = new ArrayReverse();

let arr = [ 'a', true, 30, 40, 50 ];
arrayReverse.reverse(arr, arr.length);
console.log(arr);
