const studyTasks = [
    {
        "id": "exploration",
        "name": "Exploration",
        "description": "**Scenario:**\n\nDu hast die Aufgabe bekommen ein Code-Review für das Programmier-Projekt einer Kommilitonin zu verfassen. Bei dem Projekt zu dem du Feedback geben möchtest, handelt es sich um eine typische Studienleistung in einem fortgeschrittenen Programmierkurs. Dein Dozent hat Code-Reviews als festen Bestandteil in den Kurs integriert. Im Bereich `Aufgabe` findest du die Hinweise deines Dozenten zum Code-Review. Wenn Code-Reviews für idch neu sind, findest in den Bereichen `FAQ` und `Checkliste` wertvolle Informationen\n\n**Aktivität:**\n\nErkunde die Anwendung und mache dich mit den verschiedenen Funktionen vertraut. Schaue dir verschiedene Dateien an und verfasse einige Kommentare. Du musst dich nicht inhaltlich mit dem Review auseinandersetzen. Deine Aufgabe besteht in der Exploration des User-Interfaces.\n\n**Ziel:**\n\nMache dich mit dem System vertraut. Du kannst selbst entscheiden, wann du den Task beenden möchtest.",
    },
    {
        "id": "taskfindbug",
        "name": "Bug finden und kommentieren",
        "description": "**Scenario:**\n\nDu siehst das Ergebnis eines typischen studentischen Programmierprojekts aus einem einem fortgeschrittenen Programmierkurs. Du hast bereits einige Kommentare zum JavaScript-Code hinterlassen. Jetzt geht es daran den HTML-Code einmal durchzusehen. Du hast nicht die Zeit den Code bis ins Detail durchzuarbeiten oder die Inhalte zu kommentieren, möchtest aber sicherstellen, dass sich keine größeren Bugs im Code befinden.\n\n**Aktivität:**\n\nDeine Aufgabe ist es den HTML-Code zu reviewen. Untersuche den Quellcode auf Fehler und verfasse mindestens einen Kommentar, in dem du den Autor auf einen Bug hinweist.\n\n**Ziel:**\n\nDer Task gilt als abgeschlossen, wenn du mindestens einen Kommentar verfasst hast.",
    },
    {
        "id": "taskeditcomment",
        "name": "Kommentar bearbeiten",
        "description": "**Scenario:**\n\nWie bei jedem Task, handelt es sich beim vorliegenden Projekt um eine typische Studienleistung in einem fortgeschrittenen Programmierkurs. Du hast für dieses Projekt bereits ein Review verfasst, allerdings hat dich der Quellcode-Autor darauf hingewiesen, dass ein Kommentar in der Datei `Bird List` fehlerhaft formatiert ist. Du erinnerst dich noch, dass der Kommentar in den Zeilen 30 bis 50 sein müsste.\n\n**Aktivität:**\n\nFinde den fehlerhaften Kommentar. Wichtig: Es handelt sich dabei nicht um ein inhaltliches Problem, sondern um einen Markdown-Syntaxfehler.\n\n**Ziel:**\n\nÜberarbeite den Kommentar mit der fehlerhaften Darstellung. Nutze [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) um die Inhalte übersichtlich zu präsentieren. Der Task ist abgeschlossen, wenn du den Kommentar gefunden und bearbeitet hast.",
    },
    {
        "id": "taskwritecomment",
        "name": "Kommentar verfassen",
        "description": "**Scenario:**\n\nDu bearbeitest auch in dieserm Task ein Code-Review für eine typische Studienleistung in einem fortgeschrittenen Programmierkurs. Du möchtest einen ersten Kommentar verfassen, in dem du den Quellcodeautor auf die Möglichkeit der `for in` bzw. `for of` Syntax für Iterationen, als Alternative zur klassischen `for (let i = 0; i < iterable.length; i++)` Schleife, hinweisen möchtest.\n\n**Aktivität:**\n\nNavigiere zur Datei `index.js` und kommentiere die Code-Zeile **28**. Du findest hier einen Vorschlag zu Inhalt und Gestaltung des Kommentars. Gerne kannst du auch einen vollkommenen eigenen Kommentar verfassen.\n\n*Vorschlag für Inhalt und Gestaltung des Kommentars:*\n\nDie `for (let i = 0; i < iterable.length; i++)` an dieser Stelle ist eine gute Möglichkeit über deinen Array zu Iterieren. Zur besseren Lesbarkeit kann ich aber auch `for in` bzw `for of` empfehlen. Die beiden Varianten werden für verschiedene *Iterables* genutzt (siehe [MDN](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/schleifen_und_iterationen)):\n- `for in` für Objekte\n- `for of` für Arrays\n\n**Ziel:**\n\nVerfasse einen hilfreichen, übersichtlich formatierten Kommentar zur `for of` Syntax in Datei `index.js`, Zeile **28**. Der Task ist abgeschlossen sobald du mit deinem Kommentar zufrieden bist.",
    },
    {
        "id": "taskdeletecomment",
        "name": "Kommentare löschen",
        "description": "**Scenario:** \n\nDu hast für das Code-Review eines studentischen Projekts bereits einige Kommentare verfasst. Darunter auch zwei Kommentare in der Datei `style.css`. Allerdings hast du inzwischenn deine Meinung geändert und möchtest deine Kommentare beiden Kommentare jetzt löschen.\n\n**Aktivität:**\n\nFinde und lösche die beiden Kommentare. *Tipp:* Beide Kommentare befinden sich auf derselben Code-Zeile. Dein Username ist: *FriedrichB*\n\n**Ziel:**\n\nDer Task gilt als abgeschlossen, wenn die beiden Kommentare gelöscht sind.",
    },
    {
        "id": "tasksearchvariable",
        "name": "Alternativen Variablennamen vorschlagen",
        "description": "**Scenario:** \n\nDu bearbeitest auch in diesem Task ein Code-Review für eine typische Studienleistung in einem fortgeschrittenen Programmierkurs. In der Datei `BirdList.js` wird mehrmals die Variable `disBird` genutzt. Du bist der Meinung, dass dieser Variablennamen nicht besonders lesbar ist und möchtest eine Alternative vorschlagen.\n\n**Aktivität:**\n\nFinde den Variablennamen und schreibe einen kurzen Kommentar in dem du einen besseren Variablennamen vorschlägst. Wähle dafür eine Code-Zeile die dir passend erscheint.\n\n**Ziel:**\n\nDie Aktivität ist abgeschlossen, wenn der Kommentar erstellt wurde.",
    },
];

export default studyTasks;