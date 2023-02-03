const redirect = () => {
    const message = document.querySelector('.message');
    message.innerText = window.location.hash.substring(1,);
    const jsonString = atob(message.innerText);
    console.log(jsonString);
    const jsonDict = JSON.parse(jsonString);
    const code = jsonDict.code;
    const org_scoped_id = jsonDict.org_scoped_id;
    console.log(code);
    console.log(org_scoped_id);
    fetch("https://graph.oculus.com/sso_authorize_code", {
        method: "POST",
        body: JSON.stringify({
            code: code,
            access_token: 'OC|5755038047868820|add12f26fe71bbaf723c1058e110352e',
            org_scoped_id: org_scoped_id
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
};

redirect();