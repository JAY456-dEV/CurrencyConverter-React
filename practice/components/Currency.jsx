import React, { useEffect, useState } from 'react'

function CurrencyConvert() {
    const country = [
        { code: 'USD', name: 'United States Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'GBP', name: 'British Pound Sterling' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'CHF', name: 'Swiss Franc' },
        { code: 'CNY', name: 'Chinese Yuan' },
        { code: 'SEK', name: 'Swedish Krona' },
        { code: 'NZD', name: 'New Zealand Dollar' },
        { code: 'KRW', name: 'South Korean Won' },
        { code: 'SGD', name: 'Singapore Dollar' },
        { code: 'NOK', name: 'Norwegian Krone' },
        { code: 'MXN', name: 'Mexican Peso' },
        { code: 'HKD', name: 'Hong Kong Dollar' },
        { code: 'TRY', name: 'Turkish Lira' },
        { code: 'RUB', name: 'Russian Ruble' },
        { code: 'INR', name: 'Indian Rupee' },
        { code: 'BRL', name: 'Brazilian Real' },
        { code: 'ZAR', name: 'South African Rand' },
        { code: 'AED', name: 'United Arab Emirates Dirham' },
        { code: 'SAR', name: 'Saudi Riyal' },
        { code: 'QAR', name: 'Qatari Riyal' },
        { code: 'IDR', name: 'Indonesian Rupiah' },
        { code: 'MYR', name: 'Malaysian Ringgit' },
        { code: 'PHP', name: 'Philippine Peso' },
        { code: 'THB', name: 'Thai Baht' },
        { code: 'HUF', name: 'Hungarian Forint' },
        { code: 'CZK', name: 'Czech Koruna' },
        { code: 'ILS', name: 'Israeli Shekel' },
        { code: 'PLN', name: 'Polish Zloty' },
        { code: 'DKK', name: 'Danish Krone' }
    ]

    const [from, setFrom] = useState('USD')
    const [to, setTo] = useState('INR')
    const [countryData, setCountryData] = useState({})

    const [amountFrom, setAmountFrom] = useState(0)
    const [amountTo, setAmountTo] = useState(0)
    const [result, setResult] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        const moneyData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
                const data = await response.json()
                setCountryData(data)
            } catch (e) {
                setError(e)
            } finally {
                setIsLoading(false)
            }
        }
        moneyData()
    }, [from])


    useEffect(() => {
        if (countryData) {
            if (countryData.rates && countryData.rates[to] !== undefined) {
                let total = amountFrom * countryData.rates[to]
                setResult(total)
                setAmountTo(total)
            } else {
                console.log('Rates or AED rate is not defined');
            }
        } else {
            console.log('countryData is undefined');
        }
    }, [countryData, to, amountFrom])


    if (error) {
        return <div>Something went wrong ! please try again</div>
    }

    if (isLoading) {
        return <div>Loading....</div>
    }

    function changeOrder() {
        let temp = to
        setTo(from)
        setFrom(temp)
    }

    return (
        <>
            <h1>Currency Converter</h1>
            <div className='main-convert'>
                <div className='main'>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id='amount' placeholder='Enter Amount' value={amountFrom} onChange={(e) => setAmountFrom(e.target.value)} />
                    <select value={from} onChange={(e) => setFrom(e.target.value)}>
                        {
                            country.map((cou, idx) => {
                                return <option value={cou.code} key={idx}>{cou.name}</option>
                            })
                        }

                    </select>
                </div>

                <button onClick={changeOrder}>⬆️Switch⬇️</button>

                <div className='main'>
                    <label htmlFor="get">Transfor To</label>
                    <input type="number" placeholder='Enter Amount' id='get' value={amountTo.toFixed(2)} onChange={(e) => setAmountTo(e.target.value)} />
                    <select value={to} onChange={(e) => setTo(e.target.value)}>
                        {
                            country.map((cou, idx) => {
                                return <option value={cou.code} key={idx}>{cou.name}</option>
                            })
                        }
                    </select>
                </div>
                <h1>{result.toFixed(2)}</h1>
            </div>
        </>
    )
}

export default CurrencyConvert