import {render, screen} from "@testing-library/react"
import Panel from "../components/panel.jsx";
//  import { useProtectedContext } from "../context/Protected";
import ProtectedContext from '../context/Protected';
import TestRenderer from 'react-test-renderer';
import React, { useState } from 'react';

describe("test a normal", ()=>{
    test("Flujo Normal", () => {

        /*const element = new TestRenderer.create(
            <ProtectedContext value={["user"]}>
                <Panel />
            </ProtectedContext>
        );/***/

        
         render(<Panel combustible={200000} distancia={400} />);
         let result = screen.getByText("Hola Mundo");
         expect(result).toBeInTheDocument;
    });
});