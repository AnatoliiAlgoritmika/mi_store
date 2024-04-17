
// ! получать данные с сервера
export const getData = async (url) => {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка по адресу url`);
    } else {
        return await response.json();
    }
};

//! отправлять данные на сервер
export const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    if (!response.ok) {
        throw new Error(`Ошибка по адресу url`);
    } else {
        console.log('Отправил');
        return await response.json();
    };

};