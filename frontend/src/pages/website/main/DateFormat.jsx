import React from 'react'

export function DateFormat(ms) {
    let militime = ms.value
    let timemiliseconds = new Date(militime)

    let date = timemiliseconds.getDate();
    let month = timemiliseconds.getMonth() + 1;
    let year = timemiliseconds.getFullYear();
    console.log(timemiliseconds.toString())
    console.log(month)

    return (
        <>
            {date + '/' + month + '/' + year}
        </>
    )
}
