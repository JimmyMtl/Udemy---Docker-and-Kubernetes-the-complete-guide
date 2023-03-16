import React, {useState} from "react";
import axios from "axios";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import Spinner from "../components/Spinner";

const Fib = () => {
    const queryClient = useQueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                staleTime: 5,
            }
        }
    });
    const [state, setState] = useState({
        index: "",
    });
    const fetchValues = async () => {
        const res = await axios.get("/api/values/current");
        console.log('values')
        return res.data
    };

    const fetchIndexes = async () => {
        const seenIndexes = await axios.get("/api/values/all");
        console.log('fetchIdnexes')
        return seenIndexes.data
    };

    const {data: indexes, isLoading: loadingIndexes} = useQuery(['indexes'], fetchIndexes, {
        onSuccess: (dat) => {
            console.log('fetchDat ', dat)
        }
    });
    const {data: values, isLoading: loadingValues} = useQuery(['values'], fetchValues);

    const postValues = async (index) => {
        const res = await axios.post("/api/values", {
            index,
        });
        return res.data

    }
    const {mutate, isLoading: submitLoading} = useMutation(postValues, {
        onSuccess: (data) => {
            console.log('success ???', data)
        },
        onError: (error) => {
            console.log("there was an error", error)
        },
        onSettled: () => {
            queryClient.invalidateQueries('values');
        }
    })
    const handleSubmit = async (event) => {
        event.preventDefault();

        mutate(state.index)
    };

    const renderSeenIndexes = () => {
        return indexes?.map(({number}) => (<tr key={number}>
            <th>{number}</th>
        </tr>));
    };

    const renderValues = () => {
        const entries = [];

        for (let key in values) {
            entries.push(
                <tr key={key}>
                    <th>{key}</th>
                    <th>{values[key]}</th>
                </tr>
            );
        }

        return entries;
    };
    if (submitLoading || loadingIndexes || loadingValues) {
        return <Spinner/>
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Enter your index:</label>
                    <input
                        type="number"
                        value={state.index}
                        onChange={(event) =>
                            setState((precState) => ({
                                ...precState,
                                index: event.target.value,
                            }))
                        }
                    />
                    <button type={"submit"}>Submit</button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Seen indexes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderSeenIndexes()}
                    </tbody>
                </table>
                <h3>Calculated values:</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Index</th>
                        <th>Calculated</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderValues()}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Fib;
