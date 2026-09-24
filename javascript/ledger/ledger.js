class LedgerEntry {
  constructor(date, description, change) {
    this.date = date;
    this.description = description;
    this.change = change;
  }
}
export const createEntry = (date, description, change) => {  
  let dateStr = date
  if (date.length <= 10 && date.indexOf('T') < 0) 
    dateStr += 'T00:00'
  return new LedgerEntry(new Date(dateStr), description, change)
}
let ledgerEntrySort = (a, b) => {
  return a.date - b.date ||
    a.change - b.change ||
    a.description.localeCompare(b.description)
}
const currencies = {
  'en-US_USD': {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    currencySign: 'accounting',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  'en-US_EUR': {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'narrowSymbol',
    currencySign: 'accounting',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  'nl-NL_USD': {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  'nl-NL_EUR': {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'narrowSymbol',
    currencySign: 'accounting',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
}
const locales= {
  'en-US': {
    locale: 'en-US', 
    date: 'Date', 
    description: 'Description', 
    change: 'Change', 
    sort: ledgerEntrySort, 
  },
  'nl-NL': {
    locale: 'nl-NL', 
    date: 'Datum', 
    description: 'Omschrijving', 
    change: 'Verandering', 
    sort: ledgerEntrySort,
  }
}
export function formatEntries(currency, locale, entries) {
  if (!(locale in locales))
  {
    throw new Error(`Locale: ${locale} is not supported.`)
  }
  let currencyKey = `${locale}_${currency}` 
  if (!(currencyKey in currencies))
  {
    throw new Error(`Locale: ${locale}, and Currency: ${currency} combination is not supported.`)
  }
      
  let table = '';
  table += `${locales[locale].date.padEnd(10, ' ')} | ${locales[locale].description.padEnd(25, ' ')} | ${locales[locale].change.padEnd(13, ' ')}\n`  
  entries.sort(locales[locale].sort)
  
  let dateFormatOptions = { year: 'numeric', day: '2-digit', month: '2-digit'}
  entries.forEach((entry) => {
    const dateStr = entry.date.toLocaleDateString(locale, dateFormatOptions)
    table += `${dateStr} | `;
    const truncatedDescription =
      entry.description.length > 25
        ? `${entry.description.substring(0, 22)}...`
        : entry.description.padEnd(25, ' ');
    table += `${truncatedDescription} | `;
    
    let shouldTrim = entry.change < 0 && 
          currencies[currencyKey].currencySign === 'accounting'
    let changeStr = `${(entry.change / 100).toLocaleString(
          locale,
          currencies[currencyKey],
        )} `;
    if (shouldTrim)
        changeStr = changeStr.trim()
    table += changeStr.padStart(13, ' ');
    table += '\n';
  });
  
  return table.replace(/\n$/, '');
}