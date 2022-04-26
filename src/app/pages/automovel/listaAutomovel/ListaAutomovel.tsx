import './Lista.css'
import { useState } from "react";
import { Menu } from "../../menu/Menu";

export const ListaAutomovel = () => {

    var [list, setLIst] = useState( [ {plate:'qqq', model: 'x1', brand:'fiat', color: 'red', year: '2000', renavam: '12345'},
                                        {plate:'bbb', model: 'z2', brand:'fiat', color: 'black', year: '2000', renavam: '65432'},
                                        {plate:'rrr', model: 'y4', brand:'fiat', color: 'blue', year: '2000', renavam: '14356'},
                                        {plate:'xxx', model: 'y5', brand:'fiat', color: 'blue', year: '2000', renavam: '14356'},
                                        {plate:'rrmmmr', model: 'y6', brand:'fiat', color: 'blue', year: '2000', renavam: '14356'},
                                        {plate:'ttt', model: 'y7', brand:'fiat', color: 'blue', year: '2000', renavam: '14356'},
                                        {plate:'qqqq', model: 'y9', brand:'fiat', color: 'blue', year: '2000', renavam: '14356'}
                                    ])
    const [filter, setFilter] = useState('');

    if(filter){
        const exp = eval(`/${filter.replace(/[^\d\w]+/,'.*')}/i`)
        
        list = list.filter(item => exp.test(item.plate));
    }
    const handleFilter = (e:any) => {
        setLIst(e);
    }


    return(
       
        <div className='aa'>
            <input onChange={handleFilter}/>
            <table>
                <thead>
                    <tr>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Cor</th>
                        <th>Ano</th>
                        <th>Renavam</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map( ({plate, model, brand, color, year, renavam}) =>    {
                            return <tr>
                                <td>{plate}</td>
                                <td>{model}</td>
                                <td>{brand}</td>
                                <td>{color}</td>
                                <td>{year}</td>
                                <td>{renavam}</td>
                            </tr>
                        })
                    }


                </tbody>

            </table>
        </div>
    );
}