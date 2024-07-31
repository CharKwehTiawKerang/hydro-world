<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fishs;

class FishController extends Controller
{
    public function index()
    {
        $fishs = Fishs::all();
        return response()->json($fishs);
    }

    // public function store(Request $request) {

    // }

    public function show($id)
    {
        $fish = Fishs::find($id);

        if (!empty($fish)) {
            return response()->json($fish);
        } else {
            return response()->json([
                "message" => "Fish not found"
            ], 404);
        }
    }

    // public function update(Request $request, $id) {

    // }

    // public function destroy($id) {

    // }

    public function getBivalvia()
    {
        $bivalvia = Fishs::whereBetween('id', [32, 44])->paginate(4);

        return response()->json($bivalvia);
    }

    public function getCrabs()
    {
        $totalItems = Fishs::whereBetween('id', [2, 4])->count();
        $perPage = $totalItems < 4 ? $totalItems : 4;

        $crabs = Fishs::whereBetween('id', [2, 4])->paginate($perPage);

        return response()->json($crabs);
    }

    public function getEels()
    {
        $ids = [76, 77, 172, 173, 188, 189];
        $eels = Fishs::whereIn('id', $ids)->paginate(4);

        return response()->json($eels);
    }

    public function getNormalFish()
    {
        $norms = Fishs::whereBetween('id', [49, 75])
            ->orWhereBetween('id', [78, 171])
            ->orWhereBetween('id', [174, 187])
            ->orWhereBetween('id', [190, 259])
            ->paginate(4);

        return response()->json($norms);
    }

    public function getPrawns()
    {
        $ids = [1, 31];
        $prawns = Fishs::whereBetween('id', [6, 29])
            ->orWhereIn('id', $ids)
            ->paginate(4);

        return response()->json($prawns);
    }

    public function getRays()
    {
        $rays = Fishs::where('common_name', 'like', '%ray%')
            ->where('name_bm', 'like', '%pari%')
            ->paginate(4);

        return response()->json($rays);
    }

    public function getSharks()
    {
        $sharks = Fishs::whereBetween('id', [260, 266])->paginate(4);

        return response()->json($sharks);
    }

    public function getSquids()
    {
        $totalItems = Fishs::whereBetween('id', [45, 47])->count();
        $perPage = $totalItems < 4 ? $totalItems : 4;

        $squids = Fishs::whereBetween('id', [45, 47])->paginate($perPage);

        return response()->json($squids);
    }

    public function getOthers()
    {
        $ids = [30, 48];
        $others = Fishs::whereIn('id', $ids)->paginate(4);

        return response()->json($others);
    }

    public function getFreshWater()
    {
        $freshwater = Fishs::where('type', 0)->paginate(4);
        return response()->json($freshwater);
    }

    public function getSaltWater()
    {
        $saltwater = Fishs::where('type', 1)->paginate(4);
        return response()->json($saltwater);
    }
}
