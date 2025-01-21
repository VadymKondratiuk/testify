import { observer } from "mobx-react-lite";
import TestList from "../components/testList";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { fetchTests } from "../http/testAPI";
import { Container, Card, Form } from "react-bootstrap";

const Home = observer(() => {
    const { test } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState(""); 

    useEffect(() => {
        fetchTests().then((data) => test.setTests(data.rows));
    }, [test]);

    const filteredTests = test.tests.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container
            className="d-flex flex-column align-items-center"
            style={{ height: window.innerHeight - 124 }}
        >
            <Card style={{ padding: "40px", margin: "40px", minWidth: "1250px", minHeight: '600px', backgroundColor: '#daebf7' }}>
                <Form.Control
                    type="text"
                    placeholder="Search tests by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="mb-3"
                />
                <h2>Available Tests:</h2>
                <TestList tests={filteredTests} />
            </Card>
        </Container>
    );
});

export default Home;
