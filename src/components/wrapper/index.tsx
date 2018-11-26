import { Col, Icon, Input, Layout, Menu, Row } from "antd";
import * as React from "react";

const { Header, Content } = Layout;
const { Search } = Input;

export interface IWrapperProps {
  title: string;
}

export interface IWrapperState {
  loading: boolean;
}

export default class Wrapper extends React.Component<
  IWrapperProps,
  IWrapperState
> {
  constructor(props: IWrapperProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  public render() {
    return (
      <Layout>
        <Header>
          <Row gutter={32}>
            <Col span={8}>
              <Menu mode="horizontal">
                <Menu.Item key="addPerson">
                  <Icon type="warning" />
                  Notificar Desaparición
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={8}>
              <Search
                placeholder="Buscar Persona por nombres"
                onSearch={value => console.log("Search Value", value)}
                enterButton
              />
            </Col>
          </Row>
        </Header>
        <Content>{this.props.children}</Content>
      </Layout>
    );
  }
}
