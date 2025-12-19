import { BarChart, Bar, XAxis, LabelList, YAxis } from 'recharts';
import DetermineFillColor from "./functions/determineFillColor";

export default function ReviewGraph({o_rating, experience, taste}) {

    const data = [
        {
            name: "Overall Rating",
            uv: o_rating,
            pv: 10,
            fill: DetermineFillColor(o_rating)
        },
        {
            name: "Experience",
            uv: experience,
            pv: 10,
            fill: DetermineFillColor(experience)
        },
        {
            name: "Taste",
            uv: taste,
            pv: 10,
            fill: DetermineFillColor(taste)
        }
    ]

    return (
        <BarChart width={400} height={250} data={data} margin={{top: 50, right: 50, left: 50, bottom: 50}} layout="vertical">
            <XAxis domain={[0, 10]} dataKey="name" type="number" hide/>
            <Bar dataKey="uv" fill="#8884d8" background={{ fill: '#eee' }} barSize={40}>
                <LabelList dataKey="uv" position="right" fill='eee'/>
            </Bar>
            <YAxis type="category" name="name" dataKey="name" />
        </BarChart>
    )    
    }