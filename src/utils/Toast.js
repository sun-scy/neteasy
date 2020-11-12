import { Toast } from 'vant';
export function loading() {
    Toast.loading({
        message: '请稍候...',
        forbidClick: true,
        duration: 1000
    });
}

export function success() {
    Toast.clear()
    Toast.success({
        message: 'success',
        forbidClick: true,
        duration: 500
    });
}

export function fail() {
    Toast.clear()
    Toast.fail({
        message: 'fail',
        forbidClick: true,
        duration: 500
    });
}

export function clear() {
    Toast.clear()
}