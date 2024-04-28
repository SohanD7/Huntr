import React from 'react'
import {Platform, StyleSheet} from 'react-native'
import {Tile} from 'react-native-elements'

export const jobCard = ({title, company, location, minSalary, maxSalary, url}) => (
  <Tile
    title={title}
    titleStyle={styles.title}
    company={company}
    companyStyle={styles.company}
    location={location}
    locationStyle={styles.location}
    minSalary={minSalary}
    minSalaryStyle={styles.minSalary}
    maxSalary={maxSalary}
    maxSalaryStyle={styles.maxSalary}
    url={url}
    urlStyle={styles.url}

    container={styles.container}
  />
)

const styles = StyleSheet.create({

    container:{
      flex: 1,
      alignItems: 'center',
    },

    title:{
      fontSize: 24,
      fontWeight: 'bold',
      position: 'absolute',
      left: 10,
      bottom: 90
    },
    company:{
      fontSize: 18,
      fontWeight: 'bold',
      position: 'absolute',
      left: 10,
      bottom: 50
    },
    location:{
      fontSize: 18,
      position: 'absolute',
      left: 10,
      bottom: 40
    },
    minSalary:{
      fontSize: 18,
      position: 'absolute',
      left: 10,
      bottom: 30
    },
    maxSalary:{
      fontSize: 18,
      position: 'absolute',
      left: 10,
      bottom: 20
    },
    url:{
      fontSize: 18,
      position: 'absolute',
      left: 10,
      bottom: 10
    },
})