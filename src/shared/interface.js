const read = async (url) => {
    return fetch(url)
            .then(res => res.json())
            .then(onSuccess)
            .catch(onError);
}

const onSuccess = (res) => {    
    console.log('Details fetched successfully');
    return res;
};

const onError = (err) => {
    console.error(err);
    window.alert('Service not connected.Please visit after some time');
    return;
};

export default read;