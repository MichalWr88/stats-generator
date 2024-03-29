import Image from 'next/image';

const InstructionPage = () => {
  return (
    <div className="p-2">
      <h1 className="p-2 text-3xl font-bold text-center text-indigo-600 underline uppercase underline-offset-8">
        Instrukcja generowania statystyk
      </h1>
      <ol className="ml-8 list-decimal">
        <li className="text-2xl">
          <b>Tworzenie raportu</b>
          <ol className="ml-8 text-xl list-decimal">
            <li className="py-1">
              raport z godzinami pracy{' '}
              <a
                className="italic text-blue-500"
                rel="noreferrer"
                href="https://jira.trans.eu/secure/Tempo.jspa#/reports"
                target={'_blank'}
              >
                (reports)
              </a>{' '}
              w zespole zapisujemy jako plik excela
            </li>
            <li className="py-1">otwieramy plik w programie (np LibreOffice calc ) zapisujemy jako plik html</li>
          </ol>
        </li>
        <li className="text-2xl">
          <b>Zakładka dodaj sprint</b>
          <ol className="ml-8 text-xl list-decimal">
            <li className="py-1 ">
              Wpisujemy nr sprintu, dowiezione punkty, zaplanowane punkty, dane te można znaleźć w backlogu (prawy górny
              narożnik)
              <a
                className="italic text-blue-500"
                rel="noreferrer"
                target="_blank"
                href="https://jira.trans.eu/secure/RapidBoard.jspa?rapidView=690&view=planning.nodetail&issueLimit=100"
              >
                backlog
              </a>
              <div className="w-1/4 ">
                <Image alt="backlogImg" src={'/pic1.png'} layout="responsive" objectFit="cover" width={16} height={9} />
              </div>
            </li>
            <li className="py-1">
              wpisujemy date startu sprintu(<b>poniedziałek</b>) i zakończenia(<b>niedziela</b>)
            </li>
            <li className="py-1">
              Dane ze sprintu dostępne w raporcie{' '}
              <a
                className="italic text-blue-500"
                rel="noreferrer"
                href="https://jira.trans.eu/secure/RapidBoard.jspa?rapidView=690&projectKey=CSS&view=reporting&chart=sprintRetrospective&sprint=6993"
                target={'_blank'}
              >
                report
              </a>
            </li>
            <li className="py-1">
              Uzupełniamy zakladkę request, dane przepisujemy z linka{' '}
              <a
                className="italic text-blue-500"
                rel="noreferrer"
                target="_blank"
                href="https://jira.trans.eu/issues/?filter=35285"
              >
                requests
              </a>
            </li>
            <li className="py-1">
              Uzupełniamy zakladkę bug, dane przepisujemy z linka{' '}
              <a
                className="italic text-blue-500"
                rel="noreferrer"
                target="_blank"
                href="https://jira.trans.eu/issues/?filter=35400"
              >
                bugs
              </a>
            </li>
            <li className="py-1">
              Liczbę bugów i requestów sprawdzamy jeszcze z sprint raportem{' '}
              <a
                className="italic text-blue-500"
                rel="noreferrer"
                target="_blank"
                href="https://jira.trans.eu/secure/RapidBoard.jspa?rapidView=690&view=reporting&chart=sprintRetrospective&sprint=6993"
              >
                sprint report
              </a>
            </li>
            <li>
              <b>Dodawamie raportu</b>
              <ol className="ml-8 text-xl list-decimal">
                <li className="py-1 "> plik raportu (format html) przeciągamy na wyznaczone pole pod formularzem</li>
                <li className="py-1">
                  {' '}
                  Sprawdzamy czy poprawnie są dodane <b>EpicGroup</b>
                </li>
                <li className="py-1">
                  {' '}
                  Sprawdzamy czy poprawnie są dodane <b>Typeofwork</b>
                </li>
              </ol>
            </li>
            <li className="py-1"> klikamy przycisk dodaj</li>
            <li className="py-1"> Sprint zostaje dodany do listy / następuje przekierowanie na wykresy</li>
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
            <li className="py-1">Edytowac można wszystkie pola w sprincie</li>
            <li className="py-1">W formacie csv można pobrać dane z raportu (issues)</li>
          </ol>
        </li>
      </ol>
    </div>
  );
};

export default InstructionPage;
