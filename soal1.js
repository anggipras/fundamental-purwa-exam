const seeResult = () => {
    var jb = document.getElementById('jb').value
    var ukuran = document.getElementById('ukuran').value

    var result = ''
    if(jb == 1) {
        for(i=0; i<ukuran; i++) {
            for(j=0; j<ukuran; j++) {
                result += '*'
            }
            result += '<br>'
        }
    }

    if(jb == 2) {
        for(i=0; i<ukuran; i++) {
            for(j=0; j<=i; j++) {
                result+= '*'
            }
            result += '<br>'
        }
    }

    if(jb == 3) {
        for(i=0; i<ukuran; i++) {
            for(j=0; j<=(ukuran-i); j++) {
                result += '&nbsp&nbsp'
            }
            for(k=0;k<=i;k++) {
                result += '*'
            }
            result += '<br>'
        }
    }

    return document.getElementById('lastresult').innerHTML = result
}