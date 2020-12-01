# Code Review zur Übungsaufgabe Birding App

Bitte fertigen Sie ein *Code Review* für den Lösungsvorschlag in diesem Repository an. Konzentrieren Sie sich auf die qualitativen Aspekte des Quellcodes und des *Software Designs*. Sie müssen den Code nicht ausführen und keine funktionalen Fehler oder Bugs indentifizieren. Versuchen Sie, konstruktives Feedback zur besseren Gestaltung der Teilkomponenten und Funktionen bzw. zur allgemeine Optimierung der Codequalität zu geben. Suchen Sie nach offensichtlichen Verstößen gegen bekannte Regeln zur Gestaltung und Formatierung von JavaScript-Code und identifizieren Sie [unsaubere Lösungen](https://www.martinfowler.com/bliki/CodeSmell.html), die sich negativ auf den Gesamteindruck auswirken. Vergessen Sie dabei nicht, auch positives Feedback zu geben und gelungene Stellen un Umsetzungen zu kennzeichnen.

**Machen Sie sich keine Sorgen über die Qualität Ihres Feedbacks. In der Regel sind alle Hinweise und Ratschläge nützlich. Das Anfertigen des Reviews soll nicht nur den EmpfängerInnen helfen, sonder auch eine Übungsmöglichkeit für Sie selbst darstellen. Nutzen Sie die Chance, wertvolle Erfahrungen für spätere Projekte zu sammeln.**


# Kontext: Aufgabenstellung zur Übungsaufgabe Briding App

Vom 8. bis 10. Mai fand die jährliche _Stunde der Gartenvögel_ statt. Bei [dieser Aktion](https://www.nabu.de/tiere-und-pflanzen/aktionen-und-projekte/stunde-der-gartenvoegel/index.html) des [NABU](https://www.nabu.de/) und des [LBV](https://www.lbv.de/) werden deutschlandweit Statistiken zur Populationsgröße heimischer Vogelarten erhoben. In dieser Aufgabe implementieren Sie eine Webanwendung, die ornithologisch begeisterten NutzerInnen die Teilnahme an der nächsten Vogelzählung erleichtern wird. Die Anwendung stellt 15 der häufigsten heimischen Vogelarten in einer durchsuchbaren Liste dar und erlaubt das Zählen einzelner Exemplare.

#### Darstellung der fertigen Anwendung

![GIF der fertigen Anwendung](https://git.uni-regensburg.de/multimedia-engineering/mme-online/-/raw/master/docs/Aufgaben/img/screencast-birding-app.gif)


## Anforderungen und Anwendungsbeschreibung

Versuchen Sie die folgenden Features möglichst komplett und fehlerfrei umzusetzen. Achten Sie dabei darauf, die vorgeschlagenen Architektur und die Aufgabenverteilung bezüglich der Modulstruktur einzuhalten. Vermeiden Sie fehlerhafte Implementierungen und stellen Sie eine funktionierende Bedienung der Anwendung sicher. Denken Sie daran, dass auch die qualitative Gestaltung des Quellcodes in die Bewertung einfließt.

Die komplette HTML-Struktur sowie die notwendigen CSS-Regeln sind vorgegeben. Bei der Implementierung der Anwendung können Sie sich auf die Erstellung der notwendigen JavaScript-Module konzentrieren.

#### A1) Auswahlliste mit Vogelarten

Im linken Bereich der Anwendung findet sich eine Auswahlliste (Selektor: `.bird-gallery`) aller in der App bekannten Vogelarten. Die Arten sind über ein Suchfeld oberhalb der Liste filterbar, wobei die Eingabe als Such- bzw. Filterkriterium für die Artnamen verwendet wird. Ist das Feld leer, wird die komplette Liste angezeigt. Gibt der Nutzer Text ein, wird mit jeder Änderung überprüft, ob der eingegebene String in einem der Artnamen vorkommt. Angezeigt werden dann alle Arten, auf die dieses Kriterium zutrifft.

Über die Liste kann der Benutzer Vogelarten auswählen. Dazu klickt er auf das entsprechende _Plus_-Symbol des jeweiligen Listeneintrags. Die so selektierte Art wird in das *Dashboard* aufgenommen.

#### A2) Dashboard mit beobachteten Vogelarten

Im *Dashboard* (Selektor: `.bird-counter`) - rechts von der Auswahlliste - werden alle Vogelarten dargestellt, die bereits über die Liste ausgewählt wurden. Im *Template* werden zwei als Interaktionselemente zu verwendende Bereiche definiert: `<span class="bird-counter-decrease button">` und `<span class="bird-counter-increase button">`. Diese dienen zum Zählen der beobachteten Vögel.


## Code-Struktur der Anwendung

Die Code-Struktur der fertigen Anwendung soll weit möglichst dem [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)-Ansatz folgen und dabei das [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)-Muster umsetzen. Die unterschiedlichen Aufgabenbereiche werden dabei durch separate ES6-Module abgebildet.

#### BirdingApp | `index.js`

Dieses Modul dient als zentrale Komponente der Anwendung. Beim Start werden die anderen Bestandteile der Anwendung hier initialisiert. Zur Laufzeit steuert das Modul die Kommunikation zwischen den übrigen Programmbestandteilen. Diese sind im Optimalfall unabhängig voneinander und geben nötige Informationen an das zentrale Modul weiter bzw. werden von diesem informiert und gesteuert.
#### BirdingModel | `BirdingModel.js`

Das Model der Anwendung speichert den aktuellen Zustand der App. Hier wird die Liste der verfügbaren Vogelarten gespeichert und bereit gestellt. Andere Komponenten können mit dem Model über ein öffentliches Interface kommunizieren.

#### BirdingController | `BirdingController.js`

Der *Controller* fängt alle relevanten Benutzerinteraktionen ab und gibt die damit verbundene Informationen weiter. Hierzu zählen die Nutzereingaben im Suchfeld, die Auswahl eines Eintrags aus der Auswahlliste sowie die Veränderung des *Counters* der im *Dashboard* aufgeführten Vogelarten.

#### Views | `BirdCounterView.js` und `BirdListView.js`

Die beide *Views* der Anwendung rendern die im *Model* gespeicherten Informationen für die Darstellung im *User Interface*. Beide Module stellen eine öffentliche Schnittstelle zur Verfügung, die es erlaubt, neue Einträge zum *View* hinzuzufügen. Der `BirdCounterView` verfügt zusätzlich über die Möglichkeit, bereits vorhandenen Einträge zu aktualisieren. Die *Views* repräsentieren immer den aktuellen Stand der *Anwendung*, der sich aus den im Model gespeicherten Informationen ergibt.

## Weitere Hinweise und Hilfestellungen

- Über die Notwendigkeit qualitiativ hochwertigen Quellcodes schreibt Martin Fowler [hier](https://martinfowler.com/articles/is-quality-worth-cost.html)
- Weitere Informationen zum Verfassen von Code-Reviews finden sie in der [Google Engineering Practives documentation](https://google.github.io/eng-practices/review/reviewer/standard.html)
