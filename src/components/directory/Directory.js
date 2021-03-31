import React from 'react';
import { connect } from 'react-redux'
import { selectDirectorySection } from '../../redux/directory/directory.selectors'
import { createStructuredSelector } from 'reselect'
import './Directory.scss'
import MenuItem from '../menu-item/MenuItem'

const Directory = ({sections}) => {

  const renderSections = () => {
    return sections.map(({id, ...sectionProps}) => {
      return (
        <MenuItem key={id} {...sectionProps}/>
      )
    })
  }

  console.log(sections)
  return(


    <div className="directory-menu">
      {renderSections()}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection
})

export default connect(mapStateToProps, null)(Directory);