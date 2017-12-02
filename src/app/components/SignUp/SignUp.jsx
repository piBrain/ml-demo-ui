import React, { Component, PropTypes } from 'react';
import './SignUp.css';
import InputField from '../InputField/InputField.jsx';
import Dropdown from '../Dropdown/Dropdown.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Errors, Field, Form, Control, actions } from 'react-redux-form';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.createNumArray = this.createNumArray.bind(this);
    this.createYearArray = this.createYearArray.bind(this);
    this.createLocationOptions = this.createLocationOptions.bind(this);
    this.resetErrors = this.resetErrors.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.renderCompleted = this.renderCompleted.bind(this)
  }

  validateEmail(value) {
    //email regex
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  validatePassword( value ) {
    return true;
  }
  commonValidate() {
    return true;
  }
  setValue(field, event) {
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  }

  createNumArray( maxValue ) {
    var options = [];
    const twoDigit = (num) => (`0${num}`).slice(-2)
    for (let i=1; i <= maxValue; i++ ) {
      const rep = twoDigit(i)
      options.push({ value: rep, label: rep });
    }
    return options;
  }

  createYearArray ( startYear ) {
    var currentYear = new Date().getFullYear();
    var years = [];
    startYear = startYear || 1980;

    while ( startYear <= currentYear ) {
      startYear++;
      years.push({ value: startYear, label: startYear});
    }

    return years;
  }


  createLocationOptions() { //ISO Alpha-3 codes we can changes this obviously but it's a hastle to format here
    var locations = [
      { value:"AFG", label: "Afghanistan"},
      { value:"ALA", label: "Åland Islands"},
      { value:"ALB", label: "Albania"},
      { value:"DZA", label: "Algeria"},
      { value:"ASM", label: "American Samoa"},
      { value:"AND", label: "Andorra"},
      { value:"AGO", label: "Angola"},
      { value:"AIA", label: "Anguilla"},
      { value:"ATA", label: "Antarctica"},
      { value:"ATG", label: "Antigua and Barbuda"},
      { value:"ARG", label: "Argentina"},
      { value:"ARM", label: "Armenia"},
      { value:"ABW", label: "Aruba"},
      { value:"AUS", label: "Australia"},
      { value:"AUT", label: "Austria"},
      { value:"AZE", label: "Azerbaijan"},
      { value:"BHS", label: "Bahamas"},
      { value:"BHR", label: "Bahrain"},
      { value:"BGD", label: "Bangladesh"},
      { value:"BRB", label: "Barbados"},
      { value:"BLR", label: "Belarus"},
      { value:"BEL", label: "Belgium"},
      { value:"BLZ", label: "Belize"},
      { value:"BEN", label: "Benin"},
      { value:"BMU", label: "Bermuda"},
      { value:"BTN", label: "Bhutan"},
      { value:"BOL", label: "Bolivia, Plurinational State of"},
      { value:"BES", label: "Bonaire, Sint Eustatius and Saba"},
      { value:"BIH", label: "Bosnia and Herzegovina"},
      { value:"BWA", label: "Botswana"},
      { value:"BVT", label: "Bouvet Island"},
      { value:"BRA", label: "Brazil"},
      { value:"IOT", label: "British Indian Ocean Territory"},
      { value:"BRN", label: "Brunei Darussalam"},
      { value:"BGR", label: "Bulgaria"},
      { value:"BFA", label: "Burkina Faso"},
      { value:"BDI", label: "Burundi"},
      { value:"KHM", label: "Cambodia"},
      { value:"CMR", label: "Cameroon"},
      { value:"CAN", label: "Canada"},
      { value:"CPV", label: "Cape Verde"},
      { value:"CYM", label: "Cayman Islands"},
      { value:"CAF", label: "Central African Republic"},
      { value:"TCD", label: "Chad"},
      { value:"CHL", label: "Chile"},
      { value:"CHN", label: "China"},
      { value:"CXR", label: "Christmas Island"},
      { value:"CCK", label: "Cocos (Keeling) Islands"},
      { value:"COL", label: "Colombia"},
      { value:"COM", label: "Comoros"},
      { value:"COG", label: "Congo"},
      { value:"COD", label: "Congo, the Democratic Republic of the"},
      { value:"COK", label: "Cook Islands"},
      { value:"CRI", label: "Costa Rica"},
      { value:"CIV", label: "Côte d'Ivoire"},
      { value:"HRV", label: "Croatia"},
      { value:"CUB", label: "Cuba"},
      { value:"CUW", label: "Curaçao"},
      { value:"CYP", label: "Cyprus"},
      { value:"CZE", label: "Czech Republic"},
      { value:"DNK", label: "Denmark"},
      { value:"DJI", label: "Djibouti"},
      { value:"DMA", label: "Dominica"},
      { value:"DOM", label: "Dominican Republic"},
      { value:"ECU", label: "Ecuador"},
      { value:"EGY", label: "Egypt"},
      { value:"SLV", label: "El Salvador"},
      { value:"GNQ", label: "Equatorial Guinea"},
      { value:"ERI", label: "Eritrea"},
      { value:"EST", label: "Estonia"},
      { value:"ETH", label: "Ethiopia"},
      { value:"FLK", label: "Falkland Islands (Malvinas)"},
      { value:"FRO", label: "Faroe Islands"},
      { value:"FJI", label: "Fiji"},
      { value:"FIN", label: "Finland"},
      { value:"FRA", label: "France"},
      { value:"GUF", label: "French Guiana"},
      { value:"PYF", label: "French Polynesia"},
      { value:"ATF", label: "French Southern Territories"},
      { value:"GAB", label: "Gabon"},
      { value:"GMB", label: "Gambia"},
      { value:"GEO", label: "Georgia"},
      { value:"DEU", label: "Germany"},
      { value:"GHA", label: "Ghana"},
      { value:"GIB", label: "Gibraltar"},
      { value:"GRC", label: "Greece"},
      { value:"GRL", label: "Greenland"},
      { value:"GRD", label: "Grenada"},
      { value:"GLP", label: "Guadeloupe"},
      { value:"GUM", label: "Guam"},
      { value:"GTM", label: "Guatemala"},
      { value:"GGY", label: "Guernsey"},
      { value:"GIN", label: "Guinea"},
      { value:"GNB", label: "Guinea-Bissau"},
      { value:"GUY", label: "Guyana"},
      { value:"HTI", label: "Haiti"},
      { value:"HMD", label: "Heard Island and McDonald Islands"},
      { value:"VAT", label: "Holy See (Vatican City State)"},
      { value:"HND", label: "Honduras"},
      { value:"HKG", label: "Hong Kong"},
      { value:"HUN", label: "Hungary"},
      { value:"ISL", label: "Iceland"},
      { value:"IND", label: "India"},
      { value:"IDN", label: "Indonesia"},
      { value:"IRN", label: "Iran, Islamic Republic of"},
      { value:"IRQ", label: "Iraq"},
      { value:"IRL", label: "Ireland"},
      { value:"IMN", label: "Isle of Man"},
      { value:"ISR", label: "Israel"},
      { value:"ITA", label: "Italy"},
      { value:"JAM", label: "Jamaica"},
      { value:"JPN", label: "Japan"},
      { value:"JEY", label: "Jersey"},
      { value:"JOR", label: "Jordan"},
      { value:"KAZ", label: "Kazakhstan"},
      { value:"KEN", label: "Kenya"},
      { value:"KIR", label: "Kiribati"},
      { value:"PRK", label: "Korea, Democratic People's Republic of"},
      { value:"KOR", label: "Korea, Republic of"},
      { value:"KWT", label: "Kuwait"},
      { value:"KGZ", label: "Kyrgyzstan"},
      { value:"LAO", label: "Lao People's Democratic Republic"},
      { value:"LVA", label: "Latvia"},
      { value:"LBN", label: "Lebanon"},
      { value:"LSO", label: "Lesotho"},
      { value:"LBR", label: "Liberia"},
      { value:"LBY", label: "Libya"},
      { value:"LIE", label: "Liechtenstein"},
      { value:"LTU", label: "Lithuania"},
      { value:"LUX", label: "Luxembourg"},
      { value:"MAC", label: "Macao"},
      { value:"MKD", label: "Macedonia, the former Yugoslav Republic of"},
      { value:"MDG", label: "Madagascar"},
      { value:"MWI", label: "Malawi"},
      { value:"MYS", label: "Malaysia"},
      { value:"MDV", label: "Maldives"},
      { value:"MLI", label: "Mali"},
      { value:"MLT", label: "Malta"},
      { value:"MHL", label: "Marshall Islands"},
      { value:"MTQ", label: "Martinique"},
      { value:"MRT", label: "Mauritania"},
      { value:"MUS", label: "Mauritius"},
      { value:"MYT", label: "Mayotte"},
      { value:"MEX", label: "Mexico"},
      { value:"FSM", label: "Micronesia, Federated States of"},
      { value:"MDA", label: "Moldova, Republic of"},
      { value:"MCO", label: "Monaco"},
      { value:"MNG", label: "Mongolia"},
      { value:"MNE", label: "Montenegro"},
      { value:"MSR", label: "Montserrat"},
      { value:"MAR", label: "Morocco"},
      { value:"MOZ", label: "Mozambique"},
      { value:"MMR", label: "Myanmar"},
      { value:"NAM", label: "Namibia"},
      { value:"NRU", label: "Nauru"},
      { value:"NPL", label: "Nepal"},
      { value:"NLD", label: "Netherlands"},
      { value:"NCL", label: "New Caledonia"},
      { value:"NZL", label: "New Zealand"},
      { value:"NIC", label: "Nicaragua"},
      { value:"NER", label: "Niger"},
      { value:"NGA", label: "Nigeria"},
      { value:"NIU", label: "Niue"},
      { value:"NFK", label: "Norfolk Island"},
      { value:"MNP", label: "Northern Mariana Islands"},
      { value:"NOR", label: "Norway"},
      { value:"OMN", label: "Oman"},
      { value:"PAK", label: "Pakistan"},
      { value:"PLW", label: "Palau"},
      { value:"PSE", label: "Palestinian Territory, Occupied"},
      { value:"PAN", label: "Panama"},
      { value:"PNG", label: "Papua New Guinea"},
      { value:"PRY", label: "Paraguay"},
      { value:"PER", label: "Peru"},
      { value:"PHL", label: "Philippines"},
      { value:"PCN", label: "Pitcairn"},
      { value:"POL", label: "Poland"},
      { value:"PRT", label: "Portugal"},
      { value:"PRI", label: "Puerto Rico"},
      { value:"QAT", label: "Qatar"},
      { value:"REU", label: "Réunion"},
      { value:"ROU", label: "Romania"},
      { value:"RUS", label: "Russian Federation"},
      { value:"RWA", label: "Rwanda"},
      { value:"BLM", label: "Saint Barthélemy"},
      { value:"SHN", label: "Saint Helena, Ascension and Tristan da Cunha"},
      { value:"KNA", label: "Saint Kitts and Nevis"},
      { value:"LCA", label: "Saint Lucia"},
      { value:"MAF", label: "Saint Martin (French part)"},
      { value:"SPM", label: "Saint Pierre and Miquelon"},
      { value:"VCT", label: "Saint Vincent and the Grenadines"},
      { value:"WSM", label: "Samoa"},
      { value:"SMR", label: "San Marino"},
      { value:"STP", label: "Sao Tome and Principe"},
      { value:"SAU", label: "Saudi Arabia"},
      { value:"SEN", label: "Senegal"},
      { value:"SRB", label: "Serbia"},
      { value:"SYC", label: "Seychelles"},
      { value:"SLE", label: "Sierra Leone"},
      { value:"SGP", label: "Singapore"},
      { value:"SXM", label: "Sint Maarten (Dutch part)"},
      { value:"SVK", label: "Slovakia"},
      { value:"SVN", label: "Slovenia"},
      { value:"SLB", label: "Solomon Islands"},
      { value:"SOM", label: "Somalia"},
      { value:"ZAF", label: "South Africa"},
      { value:"SGS", label: "South Georgia and the South Sandwich Islands"},
      { value:"SSD", label: "South Sudan"},
      { value:"ESP", label: "Spain"},
      { value:"LKA", label: "Sri Lanka"},
      { value:"SDN", label: "Sudan"},
      { value:"SUR", label: "Suriname"},
      { value:"SJM", label: "Svalbard and Jan Mayen"},
      { value:"SWZ", label: "Swaziland"},
      { value:"SWE", label: "Sweden"},
      { value:"CHE", label: "Switzerland"},
      { value:"SYR", label: "Syrian Arab Republic"},
      { value:"TWN", label: "Taiwan, Province of China"},
      { value:"TJK", label: "Tajikistan"},
      { value:"TZA", label: "Tanzania, United Republic of"},
      { value:"THA", label: "Thailand"},
      { value:"TLS", label: "Timor-Leste"},
      { value:"TGO", label: "Togo"},
      { value:"TKL", label: "Tokelau"},
      { value:"TON", label: "Tonga"},
      { value:"TTO", label: "Trinidad and Tobago"},
      { value:"TUN", label: "Tunisia"},
      { value:"TUR", label: "Turkey"},
      { value:"TKM", label: "Turkmenistan"},
      { value:"TCA", label: "Turks and Caicos Islands"},
      { value:"TUV", label: "Tuvalu"},
      { value:"UGA", label: "Uganda"},
      { value:"UKR", label: "Ukraine"},
      { value:"ARE", label: "United Arab Emira)es"},
      { value:"GBR", label: "United Kingdom"},
      { value:"USA", label: "United States"},
      { value:"UMI", label: "United States Minor Outlying Islands"},
      { value:"URY", label: "Uruguay"},
      { value:"UZB", label: "Uzbekistan"},
      { value:"VUT", label: "Vanuatu"},
      { value:"VEN", label: "Venezuela, Bolivarian Republic of"},
      { value:"VNM", label: "Viet Nam"},
      { value:"VGB", label: "Virgin Islands, British"},
      { value:"VIR", label: "Virgin Islands, U.S."},
      { value:"WLF", label: "Wallis and Futuna"},
      { value:"ESH", label: "Western Sahara"},
      { value:"YEM", label: "Yemen"},
      { value:"ZMB", label: "Zambia"},
      { value:"ZWE", label: "Zimbabwe"}
    ];
    return locations;
  }

  resetErrors(e) {
    const field = e.target.name
    this.props.resetFormValidity('forms.register', [field])
  }

  renderCompleted() {
    return (
      <div>
        <p>{this.props.registeredMsg}</p>
      </div>
    )
  }

  renderForm() {
    const mapToOption = (opt) => (<option value={opt['value']} key={opt['value']}>{opt['label']}</option>)
    const monthArray = this.createNumArray( 12 ).map(mapToOption);
    const dayArray = this.createNumArray( 31 ).map(mapToOption);
    const yearArray = this.createYearArray(1900).map(mapToOption);
    const secQuestionOptions = [{value: 'What was the name of your first pet?' , label: 'What was the name of your first pet?' },
      {value: 'What was your most rewarding moment in life?' , label: 'What was your most rewarding moment in life?' },
      {value: 'What was the name of your first kiss?' , label: 'What was the name of your first kiss?' },
      {value: 'What celebrity do you most resemble?' , label: 'What celebrity do you most resemble?' }].map(mapToOption)
    var genderOptions = [{ value:  'f', label: 'Female'}, { value:  'm', label: 'Male'}, { value:  'o', label: 'Other'}, { value:  'r', label: 'Rather not say'}].map(mapToOption)
    const locationOptions = this.createLocationOptions().map(mapToOption)
    const isRequired = (val) => val && val.length
    const isPhone = (val) => val.match(/^\d{10}$/)
    const isLongEnough = (val) => val.length >= 16
    const  isSufficientlyComplex = (val) => {
      var arrayPass = new Array(val)
      let passesSymCheck = arrayPass.some((chr) => {
        return chr.match(/[ !"#\$%&'\(\)\?\*\+\,\-\./\:;\<\=\>?@\[\\\]\^_`\{\|\}~]/)
      })
      let passesNumericCheck = arrayPass.some((chr) => { return chr.match(/\d/) })
      let passesAlphaCheck = arrayPass.some((chr) => { return chr.match(/[a-zA-Z]/)})
      if(passesSymCheck && passesNumericCheck && passesAlphaCheck) {
        return true
      }
      return false
    }
    return (
      <div id="signup" className={this.props.active ? "signup-container active" : "signup-container" }>
        <Form  model='forms.register' className="signup-form" onSubmit={this.props.handleSubmit}
          validators={{
              '': {
                passwordsMatch: (vals) => vals.password === vals.confirmPassword,
              },
              password: { isRequired, isLongEnough, isSufficientlyComplex },
              email: { isRequired },
              firstName: { isRequired },
              lastName: { isRequired },
              phoneNumber: { isRequired, isPhone }
          }}
        >
          <Control.text model='.firstName' placeholder='First Name'/>
          <Errors className="form-errors" model='.firstName' show='touched'
            messages={{
              isRequired: 'Cannot be blank!'
            }}
          />
          <br></br>
          <Control.text model='.lastName' placeholder='Last Name'/>
          <Errors className="form-errors" model='.lastName' show='touched'
            messages={{
              isRequired: 'Cannot be blank!'
            }}
          />
          <br></br>
          <Control.text type='text' model='.phoneNumber' placeholder='Phone' />
          <Errors className="form-errors" model='.phoneNumber' show='touched'
            messages={{
              isPhone: 'Must be a phone number in the form xxxxxxxxxx .',
              isRequired: 'Cannot be blank!'
            }}
          />
          <Control.text type='email' model='.email' placeholder='Email' onChange={this.resetErrors}/>
          <Errors className="form-errors" model='forms.register.email' show='touched'
            messages={{
              existingUser: 'User with that e-mail already exists',
              isRequired: 'Cannot be blank!'
            }}
          />
          <br></br>
          <Control.text type='password' model='.password' placeholder='Password'/>
          <Errors className="form-errors" model='forms.register' show='touched'
            messages={{
              passwordsMatch: 'Passwords must match!',
            }}
          />
          <Errors className="form-errors" model='.password' show='touched'
            messages={{
              isSufficientlyComplex: 'Must have at least 1 of each:  number, letter, and symbol("#$%&\'()*+,-./:;<=>?@[\]^_`{|}~)',
              isLongEnough: 'Must be atleast 16 characters.'
            }}
          />
          <Control.text type='password' model='.confirmPassword' placeholder='Confirm Password'/>
          <br></br>
          <p className="form-label">Birthday</p>
          <div className="line-container">
            <Control.select model='.month' className='bd-input'>
              {monthArray}
            </Control.select>
            <Control.select model='.day' className='bd-input'>
              {dayArray}
            </Control.select>
            <Control.select model='.year' className='bd-input'>
              {yearArray}
            </Control.select>
          </div>
          <div className="split-container">
            <p className="form-label">Gender</p>
            <p className="form-label">Location</p>
          </div>
          <div className="line-container split">
            <Control.select model='.gender' className='gender-input'>
              {genderOptions}
            </Control.select>
            <Control.select className='loc-input' model='.location'>
              {locationOptions}
            </Control.select>
          </div>
          <div className="split-container">
            <p className="form-label">Security Questions</p>
          </div>
          <div className="line-container split">
            <Control.select model='.secQuestion1' className='sec-dropdown'>
              {secQuestionOptions}
            </Control.select>
            <Control.text model='.secQuestionResponse1' className='sec-answer' />
          </div>
          <div className="line-container split">
            <Control.select className='sec-dropdown' model='.secQuestion2'>
              {secQuestionOptions}
            </Control.select>
            <Control.text className='sec-answer' model='.secQuestionResponse2' />
          </div>
          <input className="submit-btn" type="submit" value="Register" />
        </Form>
      </div>
    );
  }

  render(props) {
    if(this.props.registered) {
      return this.renderCompleted()
    }
    return this.renderForm()
  }
}

