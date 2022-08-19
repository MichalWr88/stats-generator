/* eslint-disable import/no-unresolved */
import WithNavBar from 'layouts/WithNavBar';
import React from 'react';

const InstructionPage = () => {
  return (
    <WithNavBar>
      <div className="p-2">
        <h1 className="text-center text-3xl uppercase font-bold p-2 text-indigo-600 underline underline-offset-8">
          Instrukcja generowania statystyk
        </h1>
        <ol className="list-decimal ml-8">
          <li className="text-2xl">
            <b>Tworzenie raportu</b>
            <ol className="ml-8 text-xl list-decimal">
              <li className="py-1">raport z godzinami pracy w zespole zapisujemy jako plik excela</li>
              <li className="py-1">otwieramy plik w programie (np LibreOffice calc ) zapisujemy jako plik excela</li>
              <li className="py-1"> zapisujemy jako plik html</li>
            </ol>
          </li>
          <li className="text-2xl">
            <b>Zakładka dodaj sprint</b>
            <ol className="ml-8 text-xl list-decimal">
              <li className="py-1">
                Wpisujemy nr sprintu dowiezione punkty jak i zaplanowane, dane te można znaleźć w backlogu (prawy górny
                narożnik)
                <a
                  className="text-blue-500 italic"
                  rel="noreferrer"
                  target="_blank"
                  href="https://jira.trans.eu/secure/RapidBoard.jspa?rapidView=690&view=planning.nodetail&issueLimit=100"
                >
                  backlog
                </a>
              </li>
              <li className="py-1">
                wpisujemy date startu sprintu(<b>poniedziałek</b>) i zakończenia(<b>niedziela</b>)
              </li>
              <li className="py-1">
                uzupełniamy zakladke request, dane przepisujemy z linka{' '}
                <a
                  className="text-blue-500 italic"
                  rel="noreferrer"
                  target="_blank"
                  href="https://jira.trans.eu/issues/?filter=35400"
                >
                  requesty
                </a>
              </li>
              <li className="py-1">
                uzupełniamy zakladke bug, dane przepisujemy z linka{' '}
                <a
                  className="text-blue-500 italic"
                  rel="noreferrer"
                  target="_blank"
                  href="https://jira.trans.eu/issues/?filter=35400"
                >
                  requesty
                </a>
              </li>
              <li className="py-1">
                Liczbe bugów i requestów sprawdzamy jeszcze z sprint raportem{' '}
                <a
                  className="text-blue-500 italic"
                  rel="noreferrer"
                  target="_blank"
                  href="https://jira.trans.eu/secure/RapidBoard.jspa?rapidView=690&view=reporting&chart=sprintRetrospective&sprint=6993"
                >
                  sprint report
                </a>
              </li>

              <li className="py-1"> plik raportu (format html) przeciągamy na wyznaczone pole pod formularzem</li>
              <li className="py-1"> Sprawdzamy czy poprawnie są dodane epiki</li>
              <li className="py-1"> Sprawdzamy czy poprawnie są dodane typy</li>
              <li className="py-1"> klikamy przycisk dodaj</li>
              <li className="py-1"> Sprint zostaje dodany do listy</li>
            </ol>
          </li>
          <li className="text-2xl">
            <b>wykresy</b>
            <ol className="ml-8 text-xl list-decimal">
              <li className="py-1">przewidywalnosc spirtnu</li>
              <li className="py-1">Predkosc spirtnu</li>
              <li className="py-1">imo spirtnu</li>
              <li className="py-1">epicks spirtnu</li>
              <li className="py-1">bugi i requesty spirtnu</li>
            </ol>
          </li>
          <li className="text-2xl">
            <b>edycja sprintów</b>
            <ol className="ml-8 text-xl list-decimal">
              <li className="py-1">edytowac mozna wszystkie pola w sprincie</li>
              <li className="py-1">w formacie csv można pobrac dane z raportu (issues)</li>
            </ol>
          </li>
        </ol>
      </div>
    </WithNavBar>
  );
};

export default InstructionPage;
