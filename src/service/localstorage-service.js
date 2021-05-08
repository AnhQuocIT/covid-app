export default (function () {
    const localStorageMgr = {
        key: "favorite",
        setToStorage(data) {
            localStorage.setItem(this.key, JSON.stringify(data));
        },
        getDataFromStorage() {
            return JSON.parse(localStorage.getItem(this.key));
        },
        updateDataToStorage(data) {
            let dataStorage = [];
            if (data == null) return;
            if (this.getDataFromStorage()) {
                dataStorage = this.getDataFromStorage();
            }
            const existItem = dataStorage.indexOf(data);
            if (existItem > -1) {
                dataStorage.splice(existItem, 1);
            } else {
                dataStorage.push(data);
            }
            this.setToStorage(dataStorage);
        },
    };

    return localStorageMgr;
})();
