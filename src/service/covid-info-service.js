import Axios from "axios";
import LocalStorage from "../service/localstorage-service";
export default (function () {
    const inforMgr = {
        baseUrl: "https://api.covid19api.com/",
        getSummary: "summary",
        getCountry: "country/",
        getInfo() {
            const summaryUrl = this.baseUrl + this.getSummary;
            return new Promise((resolve, reject) => {
                Axios.get(summaryUrl).then(res => {
                    res.data = this.mapDataWithStorage(res.data);
                    resolve(res);
                }).catch(res => {
                    reject(res);
                });
            });
        },
        mapDataWithStorage(data) {
            const dataStorage = LocalStorage.getDataFromStorage();
            if (dataStorage == null || dataStorage.length == 0) return data;
            dataStorage.forEach(item => {
                data.Countries.find(country => {
                    if (country.CountryCode == item) {
                        country.isFavorite = true;
                        return;
                    }
                })
            })
            return data;
        },
        getFavorite() {
            let favoriteList = [];
            this.getInfo().then(res => {
                const dataStorage = LocalStorage.getDataFromStorage();
                if (dataStorage == null || dataStorage.length == 0) return favoriteList;
                dataStorage.forEach(item => {
                    res.data.Countries.find(country => {
                        if (country.CountryCode == item) {
                            favoriteList.push(country);
                            return;
                        }
                    })
                })
            })
            return favoriteList;
        },
        getCovidOfCountry(country) {
            const countryUrl = this.baseUrl + this.getCountry + country;
            return new Promise((resolve, reject) => {
                Axios.get(countryUrl).then(res => {
                    resolve(res);
                }).catch(res => {
                    reject(res);
                });
            });
        },
    }
    return inforMgr;
})();