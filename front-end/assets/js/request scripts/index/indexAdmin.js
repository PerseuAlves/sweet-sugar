var token = '';
var email = '';

try {
	if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
		try {
			if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('true')) {
				window.location.href = "index.html";
			} else if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('false')) {
				token = sessionStorage.getItem('TokenLogin');
				email = sessionStorage.getItem('EmailLogin');
			}
		} catch (e) {

		}
	} else {
		window.location.href = "login.html";
	}
} catch (e) {
	window.location.href = "login.html";
}