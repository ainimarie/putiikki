# putiikki
Pistekauppa

Käyttäjät:
    - ansaitse pisteitä
    - ostaa kaupasta asioita

## 1 POC

- no real login / signups
- everything is locally
- sqlite database

## TODO

- miksi renderöi taskit sata kertaa, keksi joku kivempi systeemi ku ny

- sqlite taulun tekemiset + joku dummydatafile
- env-tiedosto & conffit
- tyypit johonkin jaettavaan interface/tyyyppi?-kansioon
- erikseen axios-kutsut
- refaktoroi joku yleinen db-haku funktio
- clienttiin:
    - pistejakelija / palkintojuttu
        - komponentti (erikseen?) taskeille
            - jotain actioneita: tee, kesken, tehty -> tehty tulee pisteet
        - jos ei erikseen, niin sit ihan basic-toiminto
    - kauppa 
    - pistetilanne
    . käyttäjänäkymä


## Palkinnot

- megaiso ~100 pistettä
    - saa ostaa 20e kaupasta jotain
- isot
    - uimahalli-käynti
    - kirppiskäynti (5euroa käyttöä)
- medium
    - koneella pelaaminen
    - "äiti tulee pelaaman pleikalla"
- pieni
    - lisäpeliaika

## lisäkehitys

- superkäyttäjä joka voi lisätä palkintoja
- näkymä siihen, miten työtehtävä etenee
- söpö kartta johonkin isoon palkintoon ヽ(✿ﾟ▽ﾟ)ノ