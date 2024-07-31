<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FishController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/fishs', [FishController::class, 'index']);
Route::get('/fish/{id}', [FishController::class, 'show']);

Route::get('/fishs/bivalvia', [FishController::class, 'getBivalvia']);
Route::get('/fishs/crabs', [FishController::class, 'getCrabs']);
Route::get('/fishs/eels', [FishController::class, 'getEels']);
Route::get('/fishs/normalfishs', [FishController::class, 'getNormalFish']);
Route::get('/fishs/prawns', [FishController::class, 'getPrawns']);
Route::get('/fishs/rays', [FishController::class, 'getRays']);
Route::get('/fishs/sharks', [FishController::class, 'getSharks']);
Route::get('/fishs/squids', [FishController::class, 'getSquids']);
Route::get('/fishs/others', [FishController::class, 'getOthers']);
Route::get('/fishs/freshwater', [FishController::class, 'getFreshWater']);
Route::get('/fishs/saltwater', [FishController::class, 'getSaltWater']);
