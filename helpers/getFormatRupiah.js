function getFormatRupiah(money){
    let number= money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    return `Rp. ${number}`
}

module.exports= getFormatRupiah