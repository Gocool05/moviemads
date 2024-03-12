import React, { useState } from 'react';
import { Steps, Form, Input,ConfigProvider, Button, Upload, message, Progress,Select, TimePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './Contest.css';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import Modal from 'antd/es/modal/Modal';
const { Step } = Steps;


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const Contest = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  // const [previewVideo, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [videoUpload, setVideoUpload] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUpload1, setImageUpload1] = useState(null);

  const [yourName, setYourName] = useState("");
  const [mobile, setMobile] = useState("");
  const [movieName, setMovieName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [actorName, setActorName] = useState("");
  const [actressName, setActressName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [contentRating, setContentRating] = useState("");
  const [duration, setDuration] = useState("");
  const [profile, setProfile] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "yourName":
        setYourName(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "movieName":
        setMovieName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "language":
        setLanguage(value);
        break;
      case "genre":
        setGenre(value);
        break;
      case "actorName":
        setActorName(value);
        break;
      case "actressName":
        setActressName(value);
        break;
      case "directorName":
        setDirectorName(value);
        break;
      case "contentRating":
        setContentRating(value);
        break;
      case "duration":
        setDuration(value);
        break;
      case "profile":
        setProfile(value);
        break;
      default:
        break;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();
      const response = await axios.post('https://strapi.letstrydevandops.site/api/contests', {
    data:{
      userName: values.yourName,
      mobileNumber: values.mobile,
      MovieName: values.movieName,
      Description: values.description,
      Language: values.language,
      Genres: values.genre,
      Actors: values.actorName,
      Actresses: values.actressName,
      Directors: values.directorName,
      contentRating: values.contentRating,
      Duration: values.duration,
      profile:values.profile
    }
    });
    console.log(response);
    const formId = response.data.data.id;
    console.log(formId);
    localStorage.setItem("formId",formId);
    setCurrentStep(currentStep + 1);  
    }
    catch (err) {
      alert("Enter Correct credentials", err);
    }
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleVideoPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleVideoUpload = async (file) => {
    setVideoUpload(file.file.originFileObj);
    console.log('video',videoUpload);
  }
  const handleImageUpload = async (file) => {
    setImageUpload(file.file.originFileObj);
    console.log('image1',imageUpload);
  }
  const handleImageUpload1 = async (file) => {
    setImageUpload1(file.file.originFileObj);
    console.log('image2',imageUpload1);
  }





  const handleUpload = async () => {
    const videoFormData = new FormData();

    const newFileData = {
      alternativeText: localStorage.getItem("formId"),
      caption: 'video',
    };

    const captionVideo = {
      caption: 'video',
    };
    // formData.append('fileInfo', JSON.stringify(newFileData));
    // formData.append('file', JSON.stringify(captionVideo));
    videoFormData.append('files', videoUpload);
    videoFormData.append('refId',localStorage.getItem("formId"))
    videoFormData.append('ref','api::contest.contest')
    videoFormData.append('field',"VideoFile")
    // Handle video upload
    console.log(' upload response:', videoFormData.values);
    
    try {
      const videoResponse = await axios.post('https://strapi.letstrydevandops.site/api/upload', videoFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle success or error for video upload
      console.log('Video upload response:', videoResponse);
    } catch (error) {
      console.error('Error uploading video:', error);
      // Handle error, e.g., show a message to the user
    }
  
    // Handle image uploads (assuming you have two imageUpload variables)
    const imageFormDatas = [imageUpload,imageUpload1];
  
    for (let i = 0; i < imageFormDatas.length; i++) {
      const imageFormData = new FormData();
      imageFormData.append('files', imageFormDatas[i]);
      imageFormData.append('refId',localStorage.getItem("formId"))
      imageFormData.append('ref','api::contest.contest')

      
      if(i==0){
        imageFormData.append('field',"MoviePoster")
        const newFileData = {
          alternativeText: localStorage.getItem("formId"),
          caption: 'MoviePoster',
        };
        // imageFormData.append('fileInfo', JSON.stringify(newFileData));
      }
      else{
        imageFormData.append('field',"MovieThumbnail")
        const newFileData = {
          alternativeText: localStorage.getItem("formId"),
          caption: 'Thumbnail',
        };
        // imageFormData.append('fileInfo', JSON.stringify(newFileData));
      }
      // Handle image upload
      try {
        const imageResponse = await axios.post('https://strapi.letstrydevandops.site/api/upload', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setCurrentStep(currentStep + 1);
        console.log('All uploads completed');
        console.log(`Image ${i + 1} upload response:`, imageResponse);
      } catch (error) {
        console.error(`Error uploading image ${i + 1}:`, error);

      }
    }
  };


  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

 
  

  const handleFinish = () => {
    // Your final submission logic goes here
    message.success('Form submitted successfully!');
  };

  const handlePayment = async(e)=>{
    
    e.preventDefault();
     const amount = 1000;
      var options = {
        key: "rzp_test_CqbzQKAn3Mm2Ol",
        key_secret:"G4ueEdy441wU3S039jtx7Rz4",
        amount: amount *100,
        currency:"INR",
        name:"MovieMads",
        description:"for testing purpose",
        handler:  function (Paymentresponse){
          // handleUpload();
        //  handleData(Paymentresponse);
        //  handleEnroll();
        
        },
        prefill: {
          name:"GOCOOL",
          email:"GOCOOL@gmail.com",
          contact:"8888888888"
        },
        notes:{
          address:"Razorpay Corporate office"
        },
        theme: {
          color:"#3399cc"
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }

  return (
    <>
    <div className="container">
      <h1 className='contest-heading'>Contest form</h1>
      <div className="steps-container">
      <ConfigProvider
      theme={{
        token:{
          colorPrimary: '#fba010',
          colorText: '#ffffff',
          colorIcon: '#ffffff',
        },
        components: {
          Steps: {
            colorPrimary: '#e50914',
            algorithm: true, 
            colorText: '#ffffff',
            colorTextTertiary: '#ffffff',
            colorTextSecondary: '#ffffff',
            navArrowColor: '#ffffff',
          },
          Button: {
            colorPrimary: '#e50914',
            algorithm: true, 
          },
          Select:{
            optionSelectedBg: '#e50914',
            selectorBg: '#495057',
            colorText: '#ffffff',
            colorPrimary: '#fba010',
            optionColor: '#212529',
            colorBgElevated: '#212529',
            colorBorder: '#495057',
            borderRadiusLG: 0,
          },
          Form: {
            colorPrimary: '#ffffff',
            colorText: '#ffffff',
            colorTextTertiary: '#ffffff',
            colorTextSecondary: '#ffffff',
            colorFillSecondary: '#ffffff',
            algorithm: true,
            labelColor: '#ffffff',
          },
          Typography: {
           colorPrimary: '#ffffff',
          },
          Upload:{
            colorText: '#ffffff',
            colorIcon: '#ffffff',
            colorPrimary: '#e50914',
            colorFillAlter: 'rgba(251, 161, 16, 0.6)',
            actionsColor: '#ffffff',
          },
          DatePicker:{
            activeBg: '#212529',
            colorBgContainer: '#495057',
            colorText: '#ffffff',
            colorBgElevated: '#212529',
            colorPrimary: '#e50914',
            colorBorder: '#495057',
            borderRadius: 0,
          },
          Progress:{
            colorBgContainer: '#ffffff',
            colorText: '#e50914',
            colorFillAlter: '#e50914',
            
          },
          Input: {
            colorBgContainer: '#495057',
            colorPrimary: '#fba010',
            algorithm: true,
            colorText: '#ffffff',
            colorBorder: '#495057',
            borderRadius: 0,
          }
        },
      }}
    >
      <Steps current={currentStep}>
        <Step title="Details" />
        <Step title="Upload" />
        <Step title="Payment" />
      </Steps>
      <div style={{ marginTop: 30 , color:"white"}}>
        {currentStep === 0 && (
          <Form
            form={form}
            onFinish={nextStep}
            layout="vertical"
            size="large"
            // initialValues={{ remember: true }}
            className="form-container"
          >
            <div  className='Two input'>
            <Form.Item
              label="Your Name"
              name="yourName"
              rules={[{ required: true, message: 'Please Enter Your Name!' }]}
              className="input-container"
              // initialValue={yourName}
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[{ required: true, message: 'Please Enter Mobile Number!' },{pattern: /^[0-9]{10}$/, message: 'Please Enter Valid Mobile Number!' }]} 
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
              </div>
            <div className='Two input'>
            <Form.Item
              label="Movie Name"
              name="movieName"
              rules={[{ required: true, message: 'Please input the movie name!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Language"
              name="language"
              rules={[{ required: true, message: 'Please Select a Language!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
             <Select>
            <Select.Option value="Tamil">Tamil</Select.Option>
            <Select.Option value="English">English</Select.Option>
            <Select.Option value="Hindi">Hindi</Select.Option>
            <Select.Option value="Telugu">Telugu</Select.Option>
            <Select.Option value="Kannada">Kannada</Select.Option>
            <Select.Option value="Malayalam">Malayalam</Select.Option>
          </Select>
            </Form.Item>
              </div>
            <div className='Two input'>
            <Form.Item
              label="Actor Name"
              name="actorName"
              rules={[{ required: true, message: 'Please Select a Language!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Actress Name"
              name="actressName"
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
              </div>
            <div className='Two input'>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input the movie name!' }]}
              className="input-container"
              onChange={handleInputChange}
              
            >
          <TextArea rows={6}   />
            </Form.Item>
            <div className="input-container">
            <Form.Item
              label="Genre"
              name="genre"
              rules={[{ required: true, message: 'Please input the movie name!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Select>
            <Select.Option value="Action">Action</Select.Option>
            <Select.Option value="Adventure">Adventure</Select.Option>
            <Select.Option value="Comedy">Comedy</Select.Option>
            <Select.Option value="Drama">Drama</Select.Option>
            <Select.Option value="Fantasy">Fantasy</Select.Option>
            <Select.Option value="Horror">Horror</Select.Option>
            <Select.Option value="Mystery">Mystery</Select.Option>
            <Select.Option value="Romance">Romance</Select.Option>
            <Select.Option value="Science fiction">Science fiction</Select.Option>
            <Select.Option value="Sports">Sports</Select.Option>
            <Select.Option value="Thriller">Thriller</Select.Option>
            <Select.Option value="Documentary">Documentary</Select.Option>
          </Select>
            </Form.Item>

            <Form.Item
              label="Director Name"
              name="directorName"
              rules={[{ required: true, message: 'Please Enter Director name!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
              <Input />
            </Form.Item>
            </div>
              </div>
            <div className='Two input'>
            <Form.Item
              label="Profile"
              name="profile"
              rules={[{ required: true, message: 'Please Select Content Rating!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
             <Select>
            <Select.Option value="Student">Student</Select.Option>
            <Select.Option value="Employee">Employee</Select.Option>
            <Select.Option value="Freelancer">Freelancer</Select.Option>
            <Select.Option value="Business Owner">Business Owner</Select.Option>
            <Select.Option value="Unemployed">Unemployed</Select.Option>
            <Select.Option value="Homemaker">Homemaker</Select.Option>
            <Select.Option value="Consultant">Consultant</Select.Option>
            <Select.Option value="Entrepreneur">Entrepreneur</Select.Option>
          </Select>
            </Form.Item>
            <Form.Item
              label="Content Rating"
              name="contentRating"
              rules={[{ required: true, message: 'Please Select Your Profile!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
             <Select>
            <Select.Option value="U">U (Universal)</Select.Option>
            <Select.Option value="UA">U/A (Universal with Adult)</Select.Option>
            <Select.Option value="A">A (Adult)</Select.Option>
        
          </Select>
            </Form.Item>
            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: 'Please Fill the Duration!' }]}
              className="input-container"
              onChange={handleInputChange}
            >
             <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="large" />
            </Form.Item>
              </div>
            {/* Add other form fields here */}
            <Form.Item>
              <Button type="primary" htmlType="submit"  onClick={handleSubmit}>
                Next
              </Button>
            </Form.Item>
          </Form>
        )}
        {currentStep === 1 && (
         <div >
          <div className="upload-container">
         <div style={{ marginBottom: '20px' }}>
          <h3>Upload Movie Poster</h3>
         <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        // fileList={fileList}
        rules={[{ required: true, message: 'Please Upload the Movie Poster' }]}
        onPreview={handlePreview}
        onChange={handleImageUpload}
        maxCount={1}
        accept="image/*"
      >
        {/* {fileList.length >= 8 ? null : uploadButton} */}
        {uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
         </div>
         <div style={{ marginBottom: '20px' }}>
          <h3>Upload Thumbnail </h3>
         <Upload
        listType="picture-card"
        rules={[{ required: true, message: 'Please Upload the Thumbnail' }]}
        onPreview={handlePreview}
        onChange={handleImageUpload1}
        maxCount={1}
        accept="image/*"

      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
         </div>
         <div style={{ marginBottom: '20px' }}>
          <h3>Upload Movie</h3>
         <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        // fileList={fileList}
        onPreview={handlePreview}
        onChange={handleVideoUpload}
        maxCount={1}
        accept="video/*"
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
         </div>
         </div>
         <div style={{ marginTop: 40 }}>
           <Button onClick={prevStep}>
             <LeftOutlined /> Previous
           </Button>
           <Button type="primary" style={{float: 'right'}} onClick={handleUpload}>
             Next
           </Button>
         </div>
       </div>
        )}
        {currentStep === 2 && (
          <div>
            Payment gateway content goes here.
            <div style={{ marginTop: 20 }}>
              <Button onClick={prevStep}>
                <LeftOutlined /> Previous
              </Button>
              <Button type="primary"  style={{float: 'right'}} onClick={handlePayment}>
                Pay
              </Button>
            </div>
          </div>
        )}
      </div>
    </ConfigProvider>
    </div>
    </div>
    </>
  )
}

export default Contest