import React, { Component } from 'react';
import emptyAvatar from '../../images/emptyAvatar.png';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      preview: emptyAvatar,
    };
  }

  onChange(e) {
    this.setState((state) => {
      return {
        ...state,
        image: e.target.files[0],
      };
    });
  }

  componentDidUpdate() {
    const { image } = this.state;
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () =>
        this.setState((state) => {
          return {
            ...state,
            preview: reader.result,
          };
        });
      reader.readAsDataURL(image);
    } else {
      this.setState((state) => {
        return {
          ...state,
          preview: null,
        };
      });
    }
  }
  render() {
    const fileInputRef = React.createRef();
    const { preview } = this.state;
    return (
      <div>
        <img
          src={preview}
          alt={'profilePic'}
          onClick={() => {
            fileInputRef.current.click();
          }}
        />
        <input
          type="file"
          onChange={(e) => this.onChange(e)}
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
      </div>
    );
  }
}

export default Avatar;
