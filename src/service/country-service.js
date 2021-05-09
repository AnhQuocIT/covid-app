import Axios from "axios";

export default (function () {
    const countryMgr = {
        url: "https://restcountries.eu/rest/v2/alpha/",
        getCountryInfo(countryCode) {
            return new Promise((resolve, reject) => {
                Axios.get(this.url + countryCode)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((res) => {
                        reject(res);
                    });
            });
        },
    };
    return countryMgr;
})();
