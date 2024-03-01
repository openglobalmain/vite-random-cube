import { clearWebStorage } from "../webStorageSaver/inWebStorage";


export function activityWatcher(navigate: any) {
    // Количество секунд с последнего действия пользователя
    let secondsSinceLastActivity = 0;

    //Five minutes. 60 x 5 = 300 seconds.
    let maxInactivity = (60 * 20);

    // Таймер отсчета по секундам
    const logoutTimer = setInterval(function () {
        secondsSinceLastActivity++;
        // Останавливаем таймер при возвращении на страницу логина
        if (window.location.pathname == process.env.PUBLIC_URL) {
            activityEvents.forEach(function (eventName) {
                document.removeEventListener(eventName, activity, true);
            });
            clearInterval(logoutTimer)
        }
        // Если пользователь был неактивен больше указанного времени, то происходит выход из сессии.
        if (secondsSinceLastActivity > maxInactivity) {
            clearWebStorage()
            activityEvents.forEach(function (eventName) {
                document.removeEventListener(eventName, activity, true);
            });
            clearInterval(logoutTimer)
            navigate('/')
        }
    }, 1000);

    // Вызывается при любой активности пользователя и обнуляет счетчик секунд с последнего действия
    function activity() {
        secondsSinceLastActivity = 0;
    }

    // Перечисление событий, с которых будет считываться активность пользователя
    let activityEvents = [
        'mousedown', 'mousemove', 'keydown',
        'scroll', 'touchstart'
    ];

    // Добавляем обработчики событий для всего документа
    activityEvents.forEach(function (eventName) {
        document.addEventListener(eventName, activity, true);
    });
}