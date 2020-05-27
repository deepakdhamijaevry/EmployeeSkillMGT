const Common = {
    validateEmail(email) {
        if (email === '' && email === null && email === undefined) {
            return true;
        }
        try {
            const emailPattern = new RegExp(''
                + /^((".+?(^|[^\\])"@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+\/=\?\^`\{\}\|~\w])*)[\w]@)|([\w]@))/.source
                + /((\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$/.source,
                'i');

            // test the regular expression against the ascii format of the email address
            return emailPattern.test(email);
        } catch {
            return false;
        }
    },
    isNumeric(val) {
        const re = /^\d*\.?\d*$/;
        // if value is not blank, then test the regex
        if (val === '' || re.test(val)) {
            return true;
        }
        return false;
    },
    isDecimal(val) {
        const re = /^\d*\.?\d*$/;
        // if value is not blank, then test the regex
        if (val === '' || re.test(val)) {
            return true;
        }
        return false;
    }
}
export default Common;