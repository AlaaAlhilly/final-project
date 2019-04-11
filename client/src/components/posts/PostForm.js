import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import uniqid from 'uniqid'
import Option from './Option'
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      code:'',
      LANGUAGE_CHOICE : [
        {name:'JAVASCRIPT'},
        {name: 'CSS'},
        {name:'HTML'},
        {name:'C#'},
        {name:'C++'},
        {name: 'BASH'},
        {name:'APACHE'},
        {name:'XML'},
        {name:'PHP'},
        {name:'JSON'},
        {name: 'PERL'},
        {name: 'SQL'},
        {name: 'RUBY'},
        {name: 'PYTHON'},
        {name: 'OBJECTIVE-C'},
        {name: 'DIFF'},
        {name: 'JAVA'},
        {name: 'COFFEESCRIPT'},
        {name:'MAKEFILE'},
        {name: 'NGINX'}
      ],
      title:"",
      language:"JAVASCRIPT",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  getOps = () => {
    let op = [];
    this.state.LANGUAGE_CHOICE.forEach((element)=>{
      op.push(
        <Option key={uniqid()} value={element.name} />
      )
    })
    return op;

  }
  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const newPost = {
      title:this.state.title,
      lang:this.state.language,
      code:this.state.code,
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
    this.setState({ text: '',language:"JAVASCRIPT",title:"",code:"" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white" id="tgbase">Snip your code here</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit} >
              <div style={{"display":"none"}} id="tgtarget">
              <div className="form-group">
              <div className="form-group">
                <label htmlFor="email">Snippet Title</label>
                <input name="title" onChange={this.onChange} value={this.state.title} type="text" placeholder="What is your code title?" className="form-control" id="title" />
              </div>
              <div className="form-group">
                  <label htmlFor="language">Code Language</label>
                  <select name="language" onChange={this.onChange} value={this.state.language} className="form-control">
                    {
                      this.getOps()
                    }
                  </select>
                </div>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="Explain here what is your code doing"
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                    error={errors.text}
                  />
                </div>
                <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Code snippet goes here"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChange}
                  error={errors.text}
                />
                </div>
              </div>
              
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
