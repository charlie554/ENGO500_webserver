function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
console.log(data1)

data1.sort(compareSecondColumn);
data2.sort(compareSecondColumn);
data3.sort(compareSecondColumn);
data4.sort(compareSecondColumn);
data5.sort(compareSecondColumn);
