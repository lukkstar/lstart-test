import React, {Component} from 'react';
import {
    Card,
    CardBody,
    Col,
    Row,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup
} from 'reactstrap';
import axios from "axios";
import {toast} from "react-toastify";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.post,
            edit: false
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.update = this.update.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    toggleEdit() {
        this.setState({edit: !this.state.edit})
    }
    onBodyChange(value) {
        this.setState(state => ({ post: Object.assign({}, state.post, { body: value }) }))
    }
    onTitleChange(value) {
        this.setState(state => ({ post: Object.assign({}, state.post, { title: value }) }))
    }
    update() {
        this.toggleEdit()
        axios.put(`https://jsonplaceholder.typicode.com/posts/${this.props.post.id}`, this.state.post).then(res => {
            toast.success('Post updated')
        });
    }
    cancel() {
        this.toggleEdit();
        this.setState({post:this.props.post});
    }

    render() {
        return (
            <Col md={6}>
                <Card>
                    <CardBody className="display-flex">
                        <div className="m-l">
                            <Row>
                                <Col md={11}>
                                    <h2 className="h4">{this.state.post.title}</h2>
                                </Col>
                                <Col md={1}>
                                    <i className="fa fa-edit" onClick={this.toggleEdit}
                                       style={{cursor: "pointer", fontSize: 20}}/>
                                </Col>
                            </Row>
                            <p className="text-muted">{this.state.post.body}</p>

                            <div>
                                <Modal isOpen={this.state.edit} toggle={this.toggleEdit}>
                                    <ModalHeader toggle={this.toggleEdit}>
                                        Edit Post
                                    </ModalHeader>
                                    <ModalBody>
                                        <Form>
                                            <FormGroup row>
                                                <Label for="title" sm={2}>Title</Label>
                                                <Col sm={10}>
                                                    <Input type="text" id="title" value={this.state.post.title} onChange={(e) => this.onTitleChange(`${e.target.value}`)}/>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Input type="textarea" placeholder="" rows={5} value={this.state.post.body} onChange={(e) => this.onBodyChange(`${e.target.value}`)}/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.update}>Save</Button>{' '}
                                        <Button color="secondary" onClick={this.cancel}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default Dashboard;
