import { useEffect, useState } from "react";
import { Modal } from "..";
import { TestResult } from "../../../../data/models/test-result";
import { Input } from "../../Forms/Input";
import { ResultProps } from "./interface";
import { DetailsContainer } from "./style";

export const ResultsModal = ({ onClose, task }: ResultProps) => {
    const [results, setResults] = useState<TestResult>({ passed: true });

    const onChange = (value: string | number) => {
        value === 1
            ? setResults({ passed: true })
            : setResults({ passed: false, message: '' });
    }

    const setMessage = (value: string | number) => {
        setResults({ passed: false, message: value as string });
    }

    const modalClosed = (saved: boolean) => {
        if (!saved) return onClose();
        task!.result = results;
        onClose(task);
    }

    useEffect(() => setResults({passed: true}), [task]);

    return (
        <Modal onClose={modalClosed} title="Test Results" show={!!task}>
            <>
                <Input type='checkbox' label="Passed Tests" checked={results.passed} onChange={onChange} />
                <DetailsContainer show={!results.passed}>
                    <Input type='textarea' label="Details" value={(results as any).message ?? ''} onChange={setMessage} />
                </DetailsContainer>
            </>
        </Modal>
    )
}